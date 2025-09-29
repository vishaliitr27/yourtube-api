import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class QuizService {
  private openai: OpenAI;

  // Inject ConfigService to securely access API keys from .env file
  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async generateQuizFromTranscript(userId: string, transcript: string) {
    console.log(`Received transcript for user: ${userId}, generating quiz...`);
    
    try {
      const prompt = `
        Based on the following video transcript, generate a quiz with 5 multiple-choice questions.
        Each question must have 4 options and one correct answer. The key for the correct answer must be "answer".
        Provide your response ONLY in the following JSON format. Do not include any other text, explanations, or markdown formatting.
        The JSON object should have a single key "questions" which is an array of question objects.

        Transcript:
        ---
        ${transcript.substring(0, 12000)}
        ---
      `;

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant designed to create quizzes from video transcripts and you only output valid JSON.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        response_format: { type: 'json_object' }, // Use OpenAI's guaranteed JSON Mode
      });

      const jsonContent = response.choices[0].message.content;

      if (!jsonContent) {
        throw new InternalServerErrorException('AI returned empty or invalid content.');
      }
      
      console.log('Quiz generated successfully.');
      return JSON.parse(jsonContent);

    } catch (aiError) {
      console.error('Error generating quiz from OpenAI:', aiError);
      throw new InternalServerErrorException('Failed to generate quiz from the AI service.');
    }
  }
}
