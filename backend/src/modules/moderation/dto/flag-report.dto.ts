import { IsString, MinLength } from 'class-validator';

export class FlagReportDto {
  @IsString()
  @MinLength(5)
  reason: string;
}
