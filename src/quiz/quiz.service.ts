import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class QuizService {
  private openai: OpenAI;

  /**
   * Initializes the service.
   * @param configService - Service for securely accessing environment variables.
   */
  constructor(private configService: ConfigService) {
    // Initialize the OpenAI client with the API key from the .env file.
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  /**
   * Generates a quiz from a given transcript using the OpenAI API.
   * @param userId - The ID of the user requesting the quiz (for future use).
   * @param transcript - The full transcript text from the YouTube video.
   * @returns A JSON object containing the generated quiz questions.
   */
  async generateQuizFromTranscript(userId: string, transcript: string) {
    console.log(`Received transcript, generating quiz for user: ${userId}`);

    // Validate the incoming transcript to ensure it's substantial enough.
    if (!transcript || transcript.trim().length < 150) {
      throw new BadRequestException(
        'Transcript is too short to generate a meaningful quiz.',
      );
    }

    try {
      // Construct the detailed prompt for the AI.
      // This prompt guides the AI to produce the exact JSON format we need.
      const prompt = `
        Based on the following video transcript, generate a quiz with 5 multiple-choice questions.
        Each question must have 4 options and one correct answer.
        The key for the correct answer in the JSON object must be "answer".
        Provide your response ONLY in the following JSON format. Do not include any other text, explanations, or markdown formatting.
        The JSON object should have a single root key "questions" which is an array of question objects.

        Transcript:
        ---
        ${transcript.substring(0, 12000)} 
        ---
      `;
      // We use substring to prevent sending excessively long transcripts and control API costs.

      // Call the OpenAI API using the gpt-4o-mini model.
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful assistant designed to create quizzes from video transcripts and output perfectly formatted JSON.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        // Use OpenAI's JSON Mode to guarantee the response is valid JSON.
        response_format: { type: 'json_object' },
      });

      const jsonContent = response.choices[0].message.content;

      // Handle the rare case where the AI might return an empty response.
      if (!jsonContent) {
        throw new InternalServerErrorException('AI returned empty content.');
      }

      // Parse the JSON string into a JavaScript object and return it.
      return JSON.parse(jsonContent);
    } catch (aiError) {
      console.error('Error generating quiz from OpenAI:', aiError);
      // Throw a generic error to avoid exposing sensitive details to the client.
      throw new InternalServerErrorException(
        'Failed to generate quiz from AI service.',
      );
    }
  }
}
