import { Controller, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class EventController implements OnModuleInit {
  constructor(private readonly databaseService: DatabaseService) {}

  onModuleInit() {
    console.log('EventsService initialized. Ready to handle events.');
  }

  @MessagePattern('events.fetch')
  async resumeDelayedPostModeration(
    @Payload() event: any,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      console.log('Event received in Service-B:', event);

      await this.databaseService.insertLog(event);

      console.log('Event processed successfully');
    } catch (err) {
      console.log(err);
      return channel.reject(originalMsg, true);
    }
    channel.ack(originalMsg);
  }
}
