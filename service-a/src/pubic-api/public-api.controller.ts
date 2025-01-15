import { Controller, Post, Req, BadRequestException } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { PublicApiService } from './public-api.service';
import { PublicApiResponseDto, QueryDto } from './dto/public-api.dto';

@Controller('public-api')
export class PublicApiController {
  constructor(private readonly publicApiService: PublicApiService) {}

  @Post('fetch')
  @ApiOperation({ summary: 'Fetch data from public API and store it' })
  @ApiBody({ type: QueryDto, description: 'Query details for fetching data' })
  @ApiOkResponse({
    description: 'Data has been successfully fetched and stored',
    type: PublicApiResponseDto,
  })
  async fetchAndStore(@Req() req: Request): Promise<PublicApiResponseDto> {
    const body = req.body;

    if (!body || !body.query) {
      throw new BadRequestException('Query is required');
    }

    return this.publicApiService.fetchAndStore(body);
  }
}
