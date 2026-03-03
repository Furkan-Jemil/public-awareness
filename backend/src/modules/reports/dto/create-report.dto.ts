import {
  IsString,
  IsEnum,
  IsUUID,
  IsOptional,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum UrgencyLevel {
  INFO = 'info',
  WARNING = 'warning',
  CRITICAL = 'critical',
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
}
