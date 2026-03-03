import {
  IsOptional,
  IsUUID,
  IsEnum,
  IsString,
  IsInt,
  Min,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UrgencyLevel } from './create-report.dto';
import { ReportStatus } from './update-report.dto';

export enum SortOption {
  RECENT = 'recent',
  URGENT = 'urgent',
  CONFIDENCE = 'confidence',
}

export class GetReportsFilterDto {
  @ApiPropertyOptional({ description: 'Filter by City UUID' })
  @IsOptional()
  @IsUUID()
  city?: string;

  @ApiPropertyOptional({ description: 'Filter by Area UUID' })
  @IsOptional()
  @IsUUID()
  area?: string;

  @ApiPropertyOptional({ description: 'Filter by Category UUID' })
  @IsOptional()
  @IsUUID()
  category?: string;

  @ApiPropertyOptional({
    enum: UrgencyLevel,
    description: 'Filter by Urgency Level',
  })
  @IsOptional()
  @IsEnum(UrgencyLevel)
  urgency?: UrgencyLevel;

  @ApiPropertyOptional({
    enum: ReportStatus,
    description: 'Filter by Report Status',
  })
  @IsOptional()
  @IsEnum(ReportStatus)
  status?: ReportStatus;

  @ApiPropertyOptional({
    description: 'Full-text search query (Title, Description, Place)',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    enum: SortOption,
    description: 'Sort criteria',
    default: SortOption.RECENT,
  })
  @IsOptional()
  @IsEnum(SortOption)
  sort?: SortOption = SortOption.RECENT;

  @ApiPropertyOptional({
    description: 'Page number for pagination',
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Items per page', default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 20;
}
