import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum ReactionType {
  REAL = 'real',
  FAKE = 'fake',
}

export class CreateReactionDto {
  @ApiProperty({ enum: ReactionType, example: ReactionType.REAL })
  @IsEnum(ReactionType)
  @IsNotEmpty()
  vote: ReactionType;
}
