import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- ADD THIS LINE ---
  // This enables automatic validation for all incoming requests that use DTOs.
  app.useGlobalPipes(new ValidationPipe());
  // --------------------

  await app.listen(3000);
}
bootstrap();