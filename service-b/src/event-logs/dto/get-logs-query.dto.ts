import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601 } from 'class-validator';

export class GetLogsQueryDto {
  @ApiProperty({
    description: 'Start date (ISO 8601 format)',
    example: '2025-01-01T00:00:00.000Z',
  })
  @IsISO8601()
  startDate: string;

  @ApiProperty({
    description: 'End date (ISO 8601 format)',
    example: '2025-01-14T23:59:59.999Z',
  })
  @IsISO8601()
  endDate: string;
}
