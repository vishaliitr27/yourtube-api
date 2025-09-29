// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module';
import { ConfigModule } from '@nestjs/config'; // <-- Import this

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // <-- Add this line
    QuizModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}