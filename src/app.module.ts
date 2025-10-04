import { Module } from '@nestjs/common';
import { QuizModule } from './quiz/quiz.module';
import { ConfigModule } from '@nestjs/config';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    // Make .env variables available globally throughout the app
    ConfigModule.forRoot({ isGlobal: true }),
    QuizModule,
    NotesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
