import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ModerationService } from './moderation.service';
import { FlagReportDto } from './dto/flag-report.dto';
import { AdminActionDto } from './dto/admin-action.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

import { Request } from 'express';

// Define a simple custom request type assuming user is injected by the guard
interface RequestWithUser extends Request {
  user: {
    id: string;
    role: string;
  };
}

@Controller()
export class ModerationController {
  constructor(private readonly moderationService: ModerationService) {}

  @Post('api/reports/:id/flag')
  @UseGuards(JwtAuthGuard)
  flagReport(
    @Param('id') id: string,
    @Body() flagDto: FlagReportDto,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.id;
    return this.moderationService.flagReport(id, userId, flagDto);
  }

  @Get('api/admin/reports')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'super_admin')
  getAdminReports() {
    return this.moderationService.getAdminReports();
  }

  @Post('api/admin/action')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'super_admin')
  performAdminAction(@Body() adminActionDto: AdminActionDto, @Req() req: any) {
    const adminId = req.user.id;
    return this.moderationService.performAdminAction(adminId, adminActionDto);
  }
}
