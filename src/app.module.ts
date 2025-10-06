// import { Module } from '@nestjs/common';
// import { QuizModule } from './quiz/quiz.module';
// import { ConfigModule } from '@nestjs/config';
// import { NotesModule } from './notes/notes.module';
// import { SupabaseModule } from './supabase/supabase.module';

// @Module({
//   imports: [
//     // Make .env variables available globally throughout the app
//     ConfigModule.forRoot({ isGlobal: true }),
//     QuizModule,
//     NotesModule,
//     SupabaseModule,
//   ],
//   controllers: [],
//   providers: [],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module';
import { ConfigModule } from '@nestjs/config';
import { NotesModule } from './notes/notes.module';
import { SupabaseModule } from './supabase/supabase.module'; // <-- IMPORT

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SupabaseModule, // <-- ADD
    QuizModule,
    NotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

