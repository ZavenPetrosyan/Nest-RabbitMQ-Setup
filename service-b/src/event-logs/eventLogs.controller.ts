import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiOkResponse,
} from '@nestjs/swagger';
import { LogsService } from './eventLogs.service';
import { LogDto } from './dto/log.dto';
import { GetLogsQueryDto } from './dto/get-logs-query.dto';

@ApiTags('Logs')
@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve event logs by date range' })
  @ApiQuery({
    name: 'startDate',
    description: 'Start date (ISO format)',
    required: true,
  })
  @ApiQuery({
    name: 'endDate',
    description: 'End date (ISO format)',
    required: true,
  })
  @ApiOkResponse({
    description: 'List of logs within the specified date range',
    type: [LogDto],
  })
  async getLogs(@Query() query: GetLogsQueryDto) {
    const { startDate, endDate } = query;
    return this.logsService.getLogs(new Date(startDate), new Date(endDate));
  }
}
