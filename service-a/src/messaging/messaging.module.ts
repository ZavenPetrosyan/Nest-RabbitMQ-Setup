import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQPublisher } from './rabbitmq.publisher';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URI || 'amqp://localhost'],
          queue: 'events_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  providers: [RabbitMQPublisher],
  exports: [RabbitMQPublisher],
})
export class MessagingModule {}
