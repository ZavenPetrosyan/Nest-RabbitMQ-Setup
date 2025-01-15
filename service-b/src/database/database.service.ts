import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class DatabaseService {
  constructor(@Inject('MONGO_CONNECTION') private readonly mongoDb: Db) {}

  private collectionName = 'event_logs';

  async insertLog(event: any) {
    const collection = this.mongoDb.collection(this.collectionName);
    await collection.insertOne({
      ...event,
      receivedAt: new Date(),
    });
  }
}
