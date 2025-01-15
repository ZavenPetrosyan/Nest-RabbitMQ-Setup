import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';
import axios from 'axios';
import { RabbitMQPublisher } from '../messaging/rabbitmq.publisher';
import { PublicApiResponseDto, QueryDto } from './dto/public-api.dto';
import { MetricsService } from '../metrics/metrics.service';

@Injectable()
export class PublicApiService {
  constructor(
    @Inject('MONGO_CONNECTION') private readonly mongoDb: Db,
    private readonly rabbitMQPublisher: RabbitMQPublisher,
    private readonly metricsService: MetricsService,
  ) {}

  async fetchAndStore(queryDto: QueryDto): Promise<PublicApiResponseDto> {
    const { query } = queryDto;

    console.log('Query Passed to API:', query);

    const startTime = Date.now();

    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`,
        { params: { userId: query } },
      );
      const data = response.data;

      console.log('API Response Data:', data);

      if (!data || data.length === 0) {
        return {
          success: true,
          message: 'No data fetched from the API',
        };
      }

      const collection = this.mongoDb.collection('search_results');
      const result = await collection.insertOne({
        query,
        data,
        createdAt: new Date(),
      });

      await this.rabbitMQPublisher.publishEvent('events.fetch', {
        action: 'fetch',
        query,
        result: result.insertedId,
        timestamp: new Date(),
      });

      console.log('MongoDB Insert Result:', result);

      return { success: true, message: 'Data fetched and stored successfully' };
    } catch (error) {
      console.error('Error in fetchAndStore:', error.message, error.stack);
      throw error;
    } finally {
      const duration = Date.now() - startTime;
      await this.metricsService.logRequest('fetchAndStore', duration);
    }
  }
}
