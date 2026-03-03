import { Test, TestingModule } from '@nestjs/testing';
import { ReportsService } from './reports.service';
import { DATABASE_CONNECTION } from '../../database/database.module';
import {
  CreateReportDto,
  UrgencyLevel,
  MediaType,
} from './dto/create-report.dto';
import { ReactionType } from './dto/create-reaction.dto';

describe('ReportsService', () => {
  let service: ReportsService;
  let mockDb: any;
  let mockTx: any;

  beforeEach(async () => {
    // Mock the transaction client
    mockTx = {
      insert: jest.fn().mockReturnThis(),
      values: jest.fn().mockReturnThis(),
      returning: jest.fn(),
      update: jest.fn().mockImplementation(() => mockTx),
      set: jest.fn().mockImplementation(() => mockTx),
      where: jest.fn().mockImplementation(() => mockTx),
      query: {
        reports: {
          findFirst: jest.fn(),
        },
        reactions: {
          findFirst: jest.fn(),
        },
        users: {
          findFirst: jest.fn(),
        },
      },
    };

    // Mock the main database client
    mockDb = {
      transaction: jest.fn().mockImplementation((cb) => cb(mockTx)),
      insert: jest.fn().mockReturnThis(),
      values: jest.fn().mockReturnThis(),
      returning: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: DATABASE_CONNECTION,
          useValue: mockDb,
        },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('creates a report and media within a transaction with right defaults', async () => {
      const createDto: CreateReportDto = {
        title: 'Broken pipe',
        description: 'Water leaking',
        categoryId: 'cat-uuid',
        cityId: 'city-uuid',
        areaId: 'area-uuid',
        urgencyLevel: UrgencyLevel.WARNING,
        media: [
          {
            type: MediaType.IMAGE,
            url: 'http://image.jpg',
          },
        ],
      };

      const reporterId = 'user-uuid';
      const mockReportId = 'new-report-uuid';

      // Mock user not banned
      mockTx.query.users.findFirst.mockResolvedValueOnce({
        id: reporterId,
        isBanned: false,
      });

      // Mock the first insert (report) return value
      mockTx.returning.mockResolvedValueOnce([
        {
          id: mockReportId,
          ...createDto,
          status: 'published',
          confidenceScore: 0,
        },
      ]);
      // Mock the second insert (media) return value
      mockTx.returning.mockResolvedValueOnce([
        {
          id: 'media-uuid',
          reportId: mockReportId,
          type: 'image',
          processingStatus: 'pending',
        },
      ]);

      await service.create(createDto, reporterId);

      // Verify transaction was called
      expect(mockDb.transaction).toHaveBeenCalled();

      // Verify report defaults and insertion
      expect(mockTx.insert).toHaveBeenCalledTimes(2);

      // First insert is for reports
      expect(mockTx.values).toHaveBeenNthCalledWith(1, {
        title: 'Broken pipe',
        description: 'Water leaking',
        categoryId: 'cat-uuid',
        cityId: 'city-uuid',
        areaId: 'area-uuid',
        urgencyLevel: 'warning',
        reporterId: 'user-uuid',
        status: 'published', // Core default check
        confidenceScore: 0, // Core default check
      });

      // Second insert is for media array
      expect(mockTx.values).toHaveBeenNthCalledWith(2, [
        {
          reportId: mockReportId,
          type: 'image',
          url: 'http://image.jpg',
          duration: undefined,
          processingStatus: 'pending', // Core default check
        },
      ]);
    });

    it('rolls back completely if media insertion fails', async () => {
      // Drizzle handles automatic rollback if an error is thrown inside tx block
      const createDto: CreateReportDto = {
        title: 'Broken pipe',
        description: 'Water leaking',
        categoryId: 'cat-uuid',
        cityId: 'city-uuid',
        areaId: 'area-uuid',
        urgencyLevel: UrgencyLevel.WARNING,
        media: [
          {
            type: MediaType.IMAGE,
            url: 'http://image.jpg',
          },
        ],
      };

      const reporterId = 'user-uuid';
      const mockReportId = 'new-report-uuid';

      // Mock user not banned
      mockTx.query.users.findFirst.mockResolvedValueOnce({
        id: reporterId,
        isBanned: false,
      });

      // Report insert succeeds
      mockTx.returning.mockResolvedValueOnce([{ id: mockReportId }]);
      // Media insert fails
      mockTx.returning.mockRejectedValueOnce(
        new Error('Media insertion error'),
      );

      await expect(service.create(createDto, reporterId)).rejects.toThrow(
        'Media insertion error',
      );
    });
  });

  describe('reactToReport', () => {
    const mockReportId = 'rep-uuid';
    const mockUserId = 'usr-uuid';
    const mockReporterId = 'reporter-uuid';

    it('submits a real reaction and increases confidence', async () => {
      // Setup mock report without existing reaction
      mockTx.query.reports.findFirst = jest.fn().mockResolvedValueOnce({
        id: mockReportId,
        reporterId: mockReporterId,
        reportsVotes: 10,
        confidenceScore: 20,
        reporter: { id: mockReporterId, trustScore: 50 },
      });
      mockTx.insert.mockClear();
      mockTx.update.mockClear();
      mockTx.set.mockClear();
      mockTx.returning = jest
        .fn()
        .mockResolvedValueOnce([{ confidenceScore: 25 }]);

      const result = await service.reactToReport(mockReportId, mockUserId, {
        vote: ReactionType.REAL,
      });

      expect(mockTx.insert).toHaveBeenCalled();
      expect(result.newConfidenceScore).toBe(25); // 20 + 5 (base real vote delta)
    });

    it('rejects duplicate reactions with ConflictException', async () => {
      // Setup mock report with existing reaction found
      mockTx.query.reports.findFirst = jest
        .fn()
        .mockResolvedValueOnce({ id: mockReportId });

      const duplicateError: any = new Error('Duplicate');
      duplicateError.code = '23505';

      mockTx.insert.mockReturnValueOnce({
        values: jest.fn().mockRejectedValueOnce(duplicateError),
      });

      await expect(
        service.reactToReport(mockReportId, mockUserId, {
          vote: ReactionType.REAL,
        }),
      ).rejects.toThrow('User has already reacted to this report');
    });

    it('drops reporter trust score heavily on fake votes if trust is low and crosses -50', async () => {
      mockTx.query.reports.findFirst = jest.fn().mockResolvedValueOnce({
        id: mockReportId,
        reporterId: mockReporterId,
        reportsVotes: 5,
        confidenceScore: -40, // Base old confidence
        reporter: { id: mockReporterId, trustScore: 20 }, // Low trust reporter
      });
      mockTx.insert.mockClear();
      mockTx.update.mockClear();
      mockTx.set.mockClear();
      mockTx.returning = jest
        .fn()
        .mockResolvedValueOnce([{ confidenceScore: -55 }]);

      const result = await service.reactToReport(mockReportId, mockUserId, {
        vote: ReactionType.FAKE,
      });

      expect(result.newConfidenceScore).toBe(-55);

      // Verify that user trust score drop was triggered since confidence crossed -50 (was -40, now -55)
      expect(mockTx.update).toHaveBeenCalledTimes(2); // One for report, one for user
    });
  });
});
