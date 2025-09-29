import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS so your extension can communicate with the backend
  app.enableCors();

  // Enable global validation pipe to automatically validate incoming data
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
