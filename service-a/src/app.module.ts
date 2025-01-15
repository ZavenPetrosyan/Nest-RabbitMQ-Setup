import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { MessagingModule } from './messaging/messaging.module';
import { SearchModule } from './search/search.module';
import { MetricsModule } from './metrics/metrics.module';
import { PublicApiModule } from './pubic-api/public-api.module';

@Module({
  imports: [
    DatabaseModule,
    MessagingModule,
    PublicApiModule,
    SearchModule,
    MetricsModule,
  ],
})
export class AppModule {}
