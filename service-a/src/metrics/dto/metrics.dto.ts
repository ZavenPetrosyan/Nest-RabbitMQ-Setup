import { ApiProperty } from '@nestjs/swagger';

export class MetricsDto {
  @ApiProperty({ description: 'Timestamp of the metric', example: 1672531200 })
  timestamp: number;

  @ApiProperty({ description: 'Value of the metric', example: 42 })
  value: number;
}
