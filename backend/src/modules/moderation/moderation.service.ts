import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { DATABASE_CONNECTION } from '../../database/database.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schema';
import { FlagReportDto } from './dto/flag-report.dto';
import { AdminActionDto, AdminAction } from './dto/admin-action.dto';
import { eq, or } from 'drizzle-orm';

@Injectable()
export class ModerationService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async flagReport(
    reportId: string,
    reporterId: string,
    flagDto: FlagReportDto,
  ) {
    return await this.db.transaction(async (tx) => {
      const report = await tx.query.reports.findFirst({
        where: eq(schema.reports.id, reportId),
      });

      if (!report) {
        throw new NotFoundException(`Report with ID ${reportId} not found`);
      }

      // Create the moderation report ticket
      const [moderationReport] = await tx
        .insert(schema.moderationReports)
        .values({
          reportId,
          reporterId,
          reason: flagDto.reason,
          status: 'pending',
        })
        .returning();

      // Automatically transition main report to "under_review" if it was "published"
      if (report.status === 'published') {
        await tx
          .update(schema.reports)
          .set({ status: 'under_review', updatedAt: new Date() })
          .where(eq(schema.reports.id, reportId));
      }

      return {
        message: 'Report flagged successfully and submitted for review',
        moderationReport,
      };
    });
  }

  async getAdminReports() {
    // Return all reports that are 'under_review' or have pending moderation tickets
    return await this.db.query.reports.findMany({
      where: eq(schema.reports.status, 'under_review'),
      with: {
        reporter: {
          columns: {
            id: true,
            displayName: true,
            trustScore: true,
          },
        },
        moderationReports: {
          where: eq(schema.moderationReports.status, 'pending'),
          with: {
            reporter: {
              columns: {
                id: true,
                displayName: true,
              },
            },
          },
        },
      },
      orderBy: (reports, { asc }) => [asc(reports.createdAt)],
    });
  }

  async performAdminAction(adminId: string, actionDto: AdminActionDto) {
    return await this.db.transaction(async (tx) => {
      // 1. Validation & Setup
      if (
        (actionDto.action === AdminAction.APPROVE ||
          actionDto.action === AdminAction.REMOVE ||
          actionDto.action === AdminAction.MARK_VERIFIED) &&
        !actionDto.reportId
      ) {
        throw new BadRequestException(
          'reportId is required for report-related actions',
        );
      }

      if (actionDto.action === AdminAction.BAN_USER && !actionDto.userId) {
        throw new BadRequestException('userId is required for ban action');
      }

      let targetId = '';
      let targetType = '';

      // 2. Perform actions
      if (actionDto.reportId) {
        targetId = actionDto.reportId;
        targetType = 'report';

        const report = await tx.query.reports.findFirst({
          where: eq(schema.reports.id, actionDto.reportId),
        });

        if (!report) {
          throw new NotFoundException(`Report ${actionDto.reportId} not found`);
        }

        let newStatus: string = 'under_review';
        if (actionDto.action === AdminAction.APPROVE) newStatus = 'published';
        if (actionDto.action === AdminAction.REMOVE) newStatus = 'removed';
        if (actionDto.action === AdminAction.MARK_VERIFIED)
          newStatus = 'verified';

        if (report.status === newStatus) {
          throw new BadRequestException(`Report is already marked as ${newStatus}`);
        }

        if (report.status === 'removed' && actionDto.action === AdminAction.APPROVE) {
          throw new BadRequestException('Cannot approve a removed report. It must be restored first.');
        }

        // Update report status
        await tx
          .update(schema.reports)
          .set({ status: newStatus as any, updatedAt: new Date() })
          .where(eq(schema.reports.id, actionDto.reportId));

        // Resolve pending moderation tickets for this report
        await tx
          .update(schema.moderationReports)
          .set({ status: 'resolved' })
          .where(eq(schema.moderationReports.reportId, actionDto.reportId));
      } else if (
        actionDto.userId &&
        actionDto.action === AdminAction.BAN_USER
      ) {
        targetId = actionDto.userId;
        targetType = 'user';

        const user = await tx.query.users.findFirst({
          where: eq(schema.users.id, actionDto.userId),
        });

        if (!user) {
          throw new NotFoundException(`User ${actionDto.userId} not found`);
        }

        await tx
          .update(schema.users)
          .set({ isBanned: true, updatedAt: new Date() })
          .where(eq(schema.users.id, actionDto.userId));
      }

      // 3. Create Audit Log Entry
      const [auditLog] = await tx
        .insert(schema.auditLogs)
        .values({
          adminId,
          action: actionDto.action,
          targetId,
          targetType,
          reason: actionDto.reason,
        })
        .returning();

      return {
        message: 'Admin action executed successfully',
        auditLog,
      };
    });
  }
}
