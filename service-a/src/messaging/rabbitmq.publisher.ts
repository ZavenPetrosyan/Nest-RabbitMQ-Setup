import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RabbitMQPublisher {
  constructor(
    @Inject('RABBITMQ_CLIENT') private readonly client: ClientProxy,
  ) {}

  async publishEvent(pattern: string, payload: any): Promise<void> {
    console.log(`Publishing event with pattern: ${pattern}`, payload);

    await firstValueFrom(this.client.emit(pattern, payload));

    console.log('Event successfully published');
  }
}
