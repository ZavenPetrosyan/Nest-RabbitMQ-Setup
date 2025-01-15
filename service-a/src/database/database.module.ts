import { Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { createClient } from 'redis';

@Module({
  providers: [
    {
      provide: 'MONGO_CONNECTION',
      useFactory: async () => {
        const client = new MongoClient(process.env.MONGO_URI);
        await client.connect();

        const db = client.db(process.env.MONGO_DB_NAME);
        const collection = db.collection('search_results');

        await collection.createIndex({ 'data.userId': 1 });
        await collection.createIndex({ 'data.title': 'text' });
        await collection.createIndex({ 'data.id': 1 });
        console.log('Indexes created on MongoDB collection');

        return db;
      },
    },
    {
      provide: 'REDIS_CONNECTION',
      useFactory: async () => {
        const client = createClient({ url: process.env.REDIS_URI });
        await client.connect();
        return client;
      },
    },
  ],
  exports: ['MONGO_CONNECTION', 'REDIS_CONNECTION'],
})
export class DatabaseModule {}
