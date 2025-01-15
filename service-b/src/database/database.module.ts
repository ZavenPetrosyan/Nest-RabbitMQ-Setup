import { Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { DatabaseService } from './database.service';

@Module({
  providers: [
    DatabaseService,
    {
      provide: 'MONGO_CONNECTION',
      useFactory: async () => {
        const client = new MongoClient(process.env.MONGO_URI);
        await client.connect();
        console.log('MongoDB connected.');
        return client.db(process.env.MONGO_DB_NAME);
      },
    },
  ],
  exports: ['MONGO_CONNECTION', DatabaseService],
})
export class DatabaseModule {}
