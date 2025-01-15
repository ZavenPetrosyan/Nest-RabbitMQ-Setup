import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import * as dotenv from 'dotenv';

import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Load environment variables
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  console.log('Connecting to RabbitMQ...');
  await app.startAllMicroservices();
  console.log('Service-B connected to RabbitMQ.');

  // Enable CORS
  app.enableCors();

  // Increase payload size limit
  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ extended: true, limit: '1mb' }));

  // Add global validation pipe
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Swagger setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Service A APIs')
    .setDescription('API documentation for Service A')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // Start the application
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`Service A is running on http://localhost:${PORT}`);
}
bootstrap();
