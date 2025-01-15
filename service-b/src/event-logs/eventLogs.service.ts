import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class LogsService {
  constructor(@Inject('MONGO_CONNECTION') private readonly mongoDb: Db) {}

  async getLogs(startDate: Date, endDate: Date) {
    const collection = this.mongoDb.collection('event_logs');

    return collection
      .find({
        receivedAt: { $gte: startDate, $lte: endDate },
      })
      .sort({ receivedAt: -1 })
      .toArray();
  }
}
