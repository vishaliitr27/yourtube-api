import { Controller, Post, Body } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { GenerateQuizDto } from './dto/generate-quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('generate')
  generateQuiz(@Body() generateQuizDto: GenerateQuizDto) {
    const { transcript } = generateQuizDto;
    
    // In the future, the real userId will come from an authentication token
    const userId = 'placeholder-user-id';
    
    return this.quizService.generateQuizFromTranscript(userId, transcript);
  }
}

