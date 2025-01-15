// import * as dotenv from 'dotenv';
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';

// async function bootstrap() {
//   dotenv.config();
//   console.log('Loaded Environment Variables:', process.env);

//   const app = await NestFactory.create(AppModule);

//   app.connectMicroservice<MicroserviceOptions>({
//     transport: Transport.RMQ,
//     options: {
//       urls: [process.env.RABBITMQ_URI || 'amqp://localhost'],
//       queue: 'events_queue', // Queue name must match Service-A's queue
//       queueOptions: { durable: true },
//     },
//   });

//   console.log('Connecting to RabbitMQ...');
//   await app.startAllMicroservices();
//   console.log('Service-B connected to RabbitMQ.');
// }
// bootstrap();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import * as dotenv from 'dotenv';

import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Load environment variables
  dotenv.config();

  // Create the app instance
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Increase payload size limit
  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ extended: true, limit: '1mb' }));

  // Add global validation pipe
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Swagger setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Service-B APIs')
    .setDescription('API documentation for Service-B')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // RabbitMQ Microservice setup
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URI || 'amqp://localhost'],
      queue: 'events_queue',
      queueOptions: { durable: true },
    },
  });

  console.log('Connecting to RabbitMQ...');
  await app.startAllMicroservices();
  console.log('Service-B connected to RabbitMQ.');

  // Start the application
  const PORT = process.env.PORT || 3001;
  await app.listen(PORT);
  console.log(`Service-B is running on http://localhost:${PORT}/api`);
}

bootstrap();
