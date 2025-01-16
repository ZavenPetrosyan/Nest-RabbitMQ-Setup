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
  async handleEventFetch(
    @Payload() event: any,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    console.log('Received event:', event);
    console.log('Delivery Tag:', originalMsg.fields?.deliveryTag);
    console.log('Consumer Tag:', originalMsg.fields?.consumerTag);
    try {
      console.log('Event received in Service-B:', event);

      await this.databaseService.insertLog(event);

      console.log('Event processed successfully');
    } catch (err) {
      console.log(err);
      channel.nack(originalMsg, false, true);
      // return channel.reject(originalMsg, true);
    }
    channel.ack(originalMsg);
  }
}
