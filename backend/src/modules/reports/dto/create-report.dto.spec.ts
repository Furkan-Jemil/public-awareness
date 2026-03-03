import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateReportDto, UrgencyLevel, MediaType } from './create-report.dto';

describe('CreateReportDto Validation', () => {
  const getValidDto = (): CreateReportDto => {
    const dto = new CreateReportDto();
    dto.title = 'Test Report';
    dto.description = 'This is a test report';
    dto.categoryId = '123e4567-e89b-12d3-a456-426614174000';
    dto.urgencyLevel = UrgencyLevel.INFO;
    dto.cityId = '223e4567-e89b-12d3-a456-426614174000';
    dto.areaId = '323e4567-e89b-12d3-a456-426614174000';
    dto.media = [
      {
        type: MediaType.IMAGE,
        url: 'https://example.com/image.jpg',
      },
    ];
    return dto;
  };

  it('Valid report creation succeeds', async () => {
    const payload = getValidDto();
    const dto = plainToInstance(CreateReportDto, payload);
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('Missing media is rejected', async () => {
    const payload = getValidDto();
    payload.media = [];
    const dto = plainToInstance(CreateReportDto, payload);
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('media');
    expect(errors[0].constraints).toHaveProperty('arrayMinSize');
  });

  it('Invalid category is rejected', async () => {
    const payload = getValidDto();
    payload.categoryId = 'invalid-uuid';
    const dto = plainToInstance(CreateReportDto, payload);
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('categoryId');
    expect(errors[0].constraints).toHaveProperty('isUuid');
  });

  it('Missing required fields rejected', async () => {
    const payload = {};
    const dto = plainToInstance(CreateReportDto, payload);
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('Invalid media type is rejected', async () => {
    const payload = getValidDto();
    payload.media = [
      {
        type: 'audio' as any,
        url: 'https://example.com/audio.mp3',
      },
    ];
    const dto = plainToInstance(CreateReportDto, payload);
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('media');
  });

  it('Video length > 30s is rejected', async () => {
    const payload = getValidDto();
    payload.media = [
      {
        type: MediaType.VIDEO,
        url: 'https://example.com/video.mp4',
        duration: 35, // Over 30s
      },
    ];
    const dto = plainToInstance(CreateReportDto, payload);
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('media');
    // Inside nested array
    const mediaError = errors[0].children[0].children.find(
      (e: any) => e.property === 'duration',
    );
    expect(mediaError).toBeDefined();
    expect(mediaError.constraints).toHaveProperty('max');
  });

  it('Video without duration is rejected', async () => {
    const payload = getValidDto();
    payload.media = [
      {
        type: MediaType.VIDEO,
        url: 'https://example.com/video.mp4',
      },
    ];
    const dto = plainToInstance(CreateReportDto, payload);
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    const mediaError = errors[0].children[0].children.find(
      (e: any) => e.property === 'duration',
    );
    expect(mediaError).toBeDefined();
    expect(mediaError.constraints).toHaveProperty('isNotEmpty');
  });
});
