import { ApiProperty } from '@nestjs/swagger';

export class SearchDto {
  @ApiProperty({ description: 'Query string used for the search' })
  query: string;

  @ApiProperty({ description: 'Search result data' })
  data: any;

  @ApiProperty({ description: 'Timestamp of when the data was stored' })
  createdAt: Date;
}
