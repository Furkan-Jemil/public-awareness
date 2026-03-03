import {
  IsString,
  IsEnum,
  IsUUID,
  IsOptional,
  ValidateIf,
} from 'class-validator';

export enum AdminAction {
  APPROVE = 'APPROVE',
  REMOVE = 'REMOVE',
  BAN_USER = 'BAN_USER',
  MARK_VERIFIED = 'MARK_VERIFIED',
}

export class AdminActionDto {
  @IsEnum(AdminAction)
  action: AdminAction;

  @ValidateIf(
    (o) =>
      o.action === AdminAction.APPROVE ||
      o.action === AdminAction.REMOVE ||
      o.action === AdminAction.MARK_VERIFIED,
  )
  @IsUUID()
  reportId?: string;

  @ValidateIf((o) => o.action === AdminAction.BAN_USER)
  @IsUUID()
  userId?: string;

  @IsString()
  reason: string;
}
