// // src/quiz/quiz.controller.ts
// import { Controller, Post, Body } from '@nestjs/common';
// import { QuizService } from './quiz.service';
// import { GenerateQuizDto } from './dto/generate-quiz.dto';

// @Controller('quiz')
// export class QuizController {
//   constructor(private readonly quizService: QuizService) {}

//   @Post('generate')
//   generateQuiz(@Body() generateQuizDto: GenerateQuizDto) {
//     const { videoId } = generateQuizDto;
//     const userId = 'placeholder-user-id'; // This will come from auth later
//     return this.quizService.generateQuizForVideo(userId, videoId);
//   }
// }


import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { GenerateQuizDto } from './dto/generate-quiz.dto';

/**
 * Handles all incoming HTTP requests related to quizzes.
 * All routes in this controller are prefixed with /quiz.
 */
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  /**
   * Defines the endpoint for generating a new quiz.
   * It listens for POST requests at the /quiz/generate URL.
   *
   * This endpoint now expects the full video transcript in the request body,
   * which is a more robust approach than trying to fetch it on the backend.
   */
  @Post('generate')
  @UsePipes(new ValidationPipe()) // Automatically validates the incoming body against the DTO
  generateQuiz(@Body() generateQuizDto: GenerateQuizDto) {
    // Destructure the validated transcript from the request body.
    const { transcript } = generateQuizDto;

    // Placeholder for the real user ID, which will be extracted from an
    // authentication token in a future step.
    const userId = 'placeholder-user-id';

    // Call the service method responsible for the business logic.
    // We pass the transcript, not the videoId.
    return this.quizService.generateQuizFromTranscript(userId, transcript);
  }
}
