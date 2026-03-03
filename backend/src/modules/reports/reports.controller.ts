import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { GetReportsFilterDto } from './dto/get-reports-filter.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Reports')
@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new report' })
  @ApiResponse({
    status: 201,
    description: 'The report has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  create(
    @Request() req: { user?: { id: string } },
    @Body() createReportDto: CreateReportDto,
  ) {
    // Expected to be populated by JwtAuthGuard

    const reporterId: string =
      req.user?.id || '00000000-0000-0000-0000-000000000001';
    return this.reportsService.create(createReportDto, reporterId);
  }

  @Get()
  @ApiOperation({
    summary: 'Get a paginated list of reports with advanced filtering',
  })
  @ApiResponse({ status: 200, description: 'List of reports returned.' })
  findAll(@Query() filterDto: GetReportsFilterDto) {
    return this.reportsService.findAll(filterDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific report by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the report' })
  @ApiResponse({ status: 200, description: 'The report was found.' })
  @ApiResponse({ status: 404, description: 'Report not found.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.reportsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a report status or details (Admin/Creator)',
  })
  @ApiParam({ name: 'id', description: 'UUID of the report' })
  @ApiResponse({ status: 200, description: 'The report has been updated.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateReportDto: UpdateReportDto,
  ) {
    return this.reportsService.update(id, updateReportDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a report' })
  @ApiParam({ name: 'id', description: 'UUID of the report' })
  @ApiResponse({
    status: 200,
    description: 'The report was deleted successfully.',
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.reportsService.remove(id);
  }
}
