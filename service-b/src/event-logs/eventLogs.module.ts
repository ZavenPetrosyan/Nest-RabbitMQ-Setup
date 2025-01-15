import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { LogsController } from './eventLogs.controller';
import { LogsService } from './eventLogs.service';

@Module({
  imports: [DatabaseModule],
  controllers: [LogsController],
  providers: [LogsService],
})
export class LogsModule {}
