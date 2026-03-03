import { PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateReportDto } from './create-report.dto';

export enum ReportStatus {
  PUBLISHED = 'published',
  UNDER_REVIEW = 'under_review',
  REMOVED = 'removed',
  VERIFIED = 'verified',
}

export class UpdateReportDto extends PartialType(CreateReportDto) {
  @ApiPropertyOptional({ enum: ReportStatus, example: ReportStatus.PUBLISHED })
  @IsOptional()
  @IsEnum(ReportStatus)
  status?: ReportStatus;
}
