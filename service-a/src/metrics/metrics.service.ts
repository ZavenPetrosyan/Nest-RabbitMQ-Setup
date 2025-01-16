import { Injectable, Inject } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class MetricsService {
  constructor(
    @Inject('REDIS_CONNECTION') private readonly redisClient: RedisClientType,
  ) {}

  async logRequest(key: string, duration: number) {
    try {
      const result = await this.redisClient.sendCommand([
        'TS.ADD',
        key,
        '*',
        `${duration}`,
      ]);
      console.log(
        `Logged metrics successfully: ${key} = ${duration}ms`,
        result,
      );
    } catch (error) {
      console.error('Failed to log metrics:', error.message, error.stack);
      throw new Error('Could not log metrics in Redis TimeSeries');
    }
  }

  async getMetrics(key: string) {
    try {
      const result = await this.redisClient.sendCommand([
        'TS.RANGE',
        key,
        '-',
        '+',
      ]);
      console.log(`Retrieved metrics for key: ${key}`, result);
      return result;
    } catch (error) {
      console.error('Failed to retrieve metrics:', error.message, error.stack);
      throw new Error('Could not retrieve metrics from Redis TimeSeries');
    }
  }
}
