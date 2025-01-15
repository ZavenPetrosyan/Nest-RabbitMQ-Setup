import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class SearchService {
  constructor(@Inject('MONGO_CONNECTION') private readonly mongoDb: Db) {}

  async search(
    query: Record<string, any>,
    page = 1,
    limit = 10,
  ): Promise<any[]> {
    const collection = this.mongoDb.collection('search_results');

    const mongoQuery: Record<string, any> = {};

    if (query.userId) {
      const userId = Number(query.userId);
      if (!isNaN(userId)) {
        mongoQuery['data.userId'] = userId;
      }
    }

    if (query.title) {
      const title = query.title.trim();
      mongoQuery['data.title'] = { $regex: title, $options: 'i' };
    }

    if (query.id) {
      const id = Number(query.id);
      if (!isNaN(id)) {
        mongoQuery['data.id'] = id;
      }
    }

    console.log('Generated Mongo Query:', JSON.stringify(mongoQuery, null, 2));

    const skip = (page - 1) * limit;
    const results = await collection
      .aggregate([
        { $match: mongoQuery },
        { $unwind: '$data' },
        { $match: mongoQuery },
        { $replaceRoot: { newRoot: '$data' } },
        { $skip: skip },
        { $limit: limit },
      ])
      .toArray();

    const uniqueResults = Array.from(
      new Map(results.map((item) => [item.id, item])).values(),
    );

    return uniqueResults;
  }
}
