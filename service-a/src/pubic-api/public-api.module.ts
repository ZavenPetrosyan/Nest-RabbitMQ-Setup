import { Module } from '@nestjs/common';
import { PublicApiService } from './public-api.service';
import { PublicApiController } from './public-api.controller';
import { MessagingModule } from '../messaging/messaging.module';
import { DatabaseModule } from '../database/database.module';
import { MetricsModule } from '../metrics/metrics.module';

@Module({
  imports: [MessagingModule, DatabaseModule, MetricsModule],
  controllers: [PublicApiController],
  providers: [PublicApiService],
})
export class PublicApiModule {}
