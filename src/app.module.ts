import { Module } from '@nestjs/common';
import { QuizModule } from './quiz/quiz.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // Make .env variables available globally throughout the app
    ConfigModule.forRoot({ isGlobal: true }),
    QuizModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
