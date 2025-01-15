import { ApiProperty } from '@nestjs/swagger';

export class LogDto {
  @ApiProperty({ description: 'Type of the event', example: 'USER_ACTION' })
  type: string;

  @ApiProperty({
    description: 'Details of the event',
    example: { action: 'click', userId: 123 },
  })
  payload: Record<string, any>;

  @ApiProperty({
    description: 'Timestamp of when the event was received',
    example: '2025-01-14T12:34:56.789Z',
  })
  receivedAt: Date;
}
