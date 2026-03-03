import { Test, TestingModule } from '@nestjs/testing';
import { ReportsService } from './reports.service';
import { DATABASE_CONNECTION } from '../../database/database.module';
import {
  CreateReportDto,
  UrgencyLevel,
  MediaType,
} from './dto/create-report.dto';

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
});
