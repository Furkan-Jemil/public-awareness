import {
  IsString,
  IsEnum,
  IsUUID,
  IsOptional,
  MaxLength,
  IsNotEmpty,
  IsUrl,
  IsInt,
  Max,
  ValidateIf,
  IsArray,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum UrgencyLevel {
  INFO = 'info',
  WARNING = 'warning',
  CRITICAL = 'critical',
}

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
}

export class CreateMediaDto {
  @ApiProperty({ enum: MediaType, example: MediaType.IMAGE })
  @IsEnum(MediaType)
  @IsNotEmpty()
  type: MediaType;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @ApiPropertyOptional({
    example: 15,
    description: 'Duration in seconds for videos. Max 30s.',
  })
  @ValidateIf((o: Record<string, any>) => o.type === MediaType.VIDEO)
  @IsInt()
  @Max(30, { message: 'Video duration cannot exceed 30 seconds' })
  @IsNotEmpty({ message: 'Duration is required for video media' })
  duration?: number;
}

export class CreateReportDto {
  @ApiProperty({ example: 'Pothole on Main St', maxLength: 255 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @ApiProperty({ example: 'Large pothole causing traffic buildup.' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'UUID of the category',
  })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ enum: UrgencyLevel, example: UrgencyLevel.WARNING })
  @IsEnum(UrgencyLevel)
  @IsNotEmpty()
  urgencyLevel: UrgencyLevel;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'UUID of the city',
  })
  @IsUUID()
  @IsNotEmpty()
  cityId: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'UUID of the area',
  })
  @IsUUID()
  @IsNotEmpty()
  areaId: string;

  @ApiPropertyOptional({ example: 'Central Plaza Mall' })
  @IsOptional()
  @IsString()
  specificPlaceName?: string;

  @ApiProperty({
    type: [CreateMediaDto],
    description:
      'List of media files attached to the report. At least one is required.',
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one media file must be provided' })
  @ValidateNested({ each: true })
  @Type(() => CreateMediaDto)
  media: CreateMediaDto[];
}
