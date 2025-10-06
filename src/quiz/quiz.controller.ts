// import { Controller, Post, Body } from '@nestjs/common';
// import { QuizService } from './quiz.service';
// import { GenerateQuizDto } from './dto/generate-quiz.dto';

// @Controller('quiz')
// export class QuizController {
//   constructor(private readonly quizService: QuizService) {}

//   @Post('generate')
//   generateQuiz(@Body() generateQuizDto: GenerateQuizDto) {
//     const { transcript } = generateQuizDto;
    
//     // In the future, the real userId will come from an authentication token
//     const userId = 'placeholder-user-id';
    
//     return this.quizService.generateQuizFromTranscript(userId, transcript);
//   }
// }

import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { GenerateQuizDto } from './dto/generate-quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('generate')
  generateQuiz(@Body(new ValidationPipe()) generateQuizDto: GenerateQuizDto) {
    const { videoId, videoTitle, transcript } = generateQuizDto;
    // In the future, userId will come from an auth guard
    const userId = 'placeholder-user-id';
    return this.quizService.generateQuizFromTranscript(
      userId,
      videoId,
      videoTitle,
      transcript,
    );
  }
}

