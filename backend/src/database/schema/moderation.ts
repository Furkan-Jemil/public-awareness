import { pgTable, uuid, text, timestamp, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { moderationStatusEnum } from './enums';
import { users } from './users';
import { reports } from './reports';

export const moderationReports = pgTable(
  'moderation_reports',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    reportId: uuid('report_id')
      .references(() => reports.id, { onDelete: 'cascade' })
      .notNull(),
    reporterId: uuid('reporter_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    reason: text('reason').notNull(),
    status: moderationStatusEnum('status').default('pending').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (t) => ({
    statusIdx: index('idx_moderation_reports_status').on(t.status),
    reportIdIdx: index('idx_moderation_reports_report_id').on(t.reportId),
  }),
);

export const moderationReportsRelations = relations(
  moderationReports,
  ({ one }) => ({
    report: one(reports, {
      fields: [moderationReports.reportId],
      references: [reports.id],
    }),
    reporter: one(users, {
      fields: [moderationReports.reporterId],
      references: [users.id],
    }),
  }),
);

export const auditLogs = pgTable(
  'audit_logs',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    adminId: uuid('admin_id').references(() => users.id, {
      onDelete: 'set null',
    }),
    action: text('action').notNull(),
    targetId: uuid('target_id').notNull(),
    targetType: text('target_type').notNull(),
    reason: text('reason').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (t) => ({
    targetIdx: index('idx_audit_logs_target').on(t.targetType, t.targetId),
  }),
);

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
  admin: one(users, {
    fields: [auditLogs.adminId],
    references: [users.id],
  }),
}));
