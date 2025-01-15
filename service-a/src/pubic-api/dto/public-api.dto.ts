import { ApiProperty } from '@nestjs/swagger';

export class QueryDto {
  @ApiProperty({
    description: 'Query string for public API',
    example: '1',
  })
  query: string;
}

export class PublicApiResponseDto {
  @ApiProperty({
    description: 'Indicates whether the operation was successful',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Optional message',
    example: 'Data fetched and stored successfully',
  })
  message: string;
}
