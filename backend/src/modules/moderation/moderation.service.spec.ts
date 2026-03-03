import { Test, TestingModule } from '@nestjs/testing';
import { ModerationService } from './moderation.service';
import { DATABASE_CONNECTION } from '../../database/database.module';
import { AdminAction } from './dto/admin-action.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ModerationService', () => {
  let service: ModerationService;
  let mockDb: any;
  let mockTx: any;

  beforeEach(async () => {
    mockTx = {
      insert: jest.fn().mockReturnThis(),
      values: jest.fn().mockReturnThis(),
      returning: jest.fn().mockResolvedValue([{ id: 'mock-id' }]),
      update: jest.fn().mockImplementation(() => mockTx),
      set: jest.fn().mockImplementation(() => mockTx),
      where: jest.fn().mockImplementation(() => mockTx),
      query: {
        reports: {
          findFirst: jest.fn(),
          findMany: jest.fn(),
        },
      },
    };

    mockDb = {
      transaction: jest.fn().mockImplementation((cb) => cb(mockTx)),
      query: {
        reports: {
          findMany: jest.fn(),
        },
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ModerationService,
        {
          provide: DATABASE_CONNECTION,
          useValue: mockDb,
        },
      ],
    }).compile();

    service = module.get<ModerationService>(ModerationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('flagReport', () => {
    it('creates a moderation report ticket and transitions a published report to under_review', async () => {
      mockTx.query.reports.findFirst.mockResolvedValueOnce({
        id: 'rep-1',
        status: 'published',
      });

      const result = await service.flagReport('rep-1', 'user-1', {
        reason: 'spam',
      });

      expect(mockTx.insert).toHaveBeenCalledTimes(1); // Ticket insertion
      expect(mockTx.update).toHaveBeenCalledTimes(1); // Report status update
      expect(result.message).toBe('Report flagged successfully and submitted for review');
    });

    it('throws NotFoundException if report doesnt exist', async () => {
      mockTx.query.reports.findFirst.mockResolvedValueOnce(null);

      await expect(
        service.flagReport('rep-99', 'user-1', { reason: 'spam' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getAdminReports', () => {
    it('fetches admin reports successfully', async () => {
      mockDb.query.reports.findMany.mockResolvedValueOnce([{ id: 'rep-1' }]);
      const reports = await service.getAdminReports();
      expect(reports).toHaveLength(1);
    });
  });

  describe('performAdminAction', () => {
    it('approves a report, resolves tickets, and logs the action', async () => {
      mockTx.query.reports.findFirst.mockResolvedValueOnce({ id: 'rep-1' });

      const result = await service.performAdminAction('admin-1', {
        reportId: 'rep-1',
        action: AdminAction.APPROVE,
        reason: 'Looks clean',
      });

      expect(mockTx.update).toHaveBeenCalledTimes(2); // One for report status, one for moderation tickets
      expect(mockTx.insert).toHaveBeenCalledTimes(1); // One for auditLog
      expect(mockTx.values).toHaveBeenCalledWith(
        expect.objectContaining({
          adminId: 'admin-1',
          action: 'APPROVE',
          targetId: 'rep-1',
          targetType: 'report',
          reason: 'Looks clean',
        })
      );
      expect(result.message).toBe('Admin action executed successfully');
    });

    it('throws BadRequestException if report actions lack reportId', async () => {
      await expect(
        service.performAdminAction('admin-1', {
          action: AdminAction.REMOVE,
          reason: 'Missing report ID',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
