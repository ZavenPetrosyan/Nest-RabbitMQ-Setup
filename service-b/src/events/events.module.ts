import { Module } from '@nestjs/common';
import { EventController } from './events.controller';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule],
  providers: [],
  controllers: [EventController],
})
export class EventsModule {}
