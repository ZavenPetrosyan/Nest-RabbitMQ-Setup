import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { MetricsService } from './metrics.service';
import { MetricsDto } from './dto/metrics.dto';

@ApiTags('Metrics')
@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get('log')
  @ApiOperation({ summary: 'Get metrics from Redis TimeSeries' })
  @ApiQuery({
    name: 'key',
    required: true,
    description: 'Key for querying metrics',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved metrics',
    type: [MetricsDto],
  })
  async getMetrics(@Query('key') key: string) {
    return this.metricsService.getMetrics(key);
  }
}
