import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { SearchService } from './search.service';
import { SearchDto } from './dto/search.dto';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @ApiOperation({ summary: 'Search stored data with pagination' })
  @ApiQuery({
    name: 'userId',
    required: false,
    description: 'Filter by userId',
  })
  @ApiQuery({ name: 'title', required: false, description: 'Filter by title' })
  @ApiQuery({ name: 'id', required: false, description: 'Filter by id' })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
    description: 'Number of items per page',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved search results',
    type: [SearchDto],
  })
  async search(
    @Query('userId') userId?: string,
    @Query('title') title?: string,
    @Query('id') id?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<any[]> {
    const query: Record<string, any> = { userId, title, id };

    if (!userId && !title && !id) {
      throw new BadRequestException('At least one query parameter is required');
    }

    return this.searchService.search(query, page, limit);
  }
}
