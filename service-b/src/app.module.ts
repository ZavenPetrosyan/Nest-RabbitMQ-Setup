import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { LogsModule } from './event-logs/eventLogs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventsModule,
    DatabaseModule,
    LogsModule,
  ],
})
export class AppModule {}
