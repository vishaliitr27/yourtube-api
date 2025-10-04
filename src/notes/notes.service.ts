import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class NotesService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async generateNotesFromTranscript(userId: string, transcript: string) {
    console.log(`Received transcript, generating NOTES for user: ${userId}`);

    if (!transcript || transcript.trim().length < 100) {
        throw new BadRequestException('Transcript is too short to generate meaningful notes.');
    }
    
    try {
      const prompt = `
        Based on the following video transcript, generate concise and well-structured study notes.
        The notes should summarize the key points, concepts, and important information from the text.
        Use headings, bullet points, and bold text to organize the information for easy reading.
        Provide your response ONLY in the following JSON format. Do not include any other text or markdown formatting.
        The JSON object should have a single key "notes" which is a string containing the formatted summary.

        Example of the desired notes format within the string:
        "**Main Topic 1**
        - Key point A about topic 1.
        - Key point B, which elaborates on the first point.
        
        **Concept 2 Explained**
        - Definition of the concept.
        - Example of how the concept is applied."

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
            content: 'You are a helpful assistant that summarizes transcripts into structured study notes and outputs JSON.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        response_format: { type: 'json_object' },
      });

      const jsonContent = response.choices[0].message.content;

      if (!jsonContent) {
        throw new InternalServerErrorException('AI returned empty content.');
      }
      
      const notesData = JSON.parse(jsonContent);

      if (!notesData.notes || typeof notesData.notes !== 'string') {
        throw new InternalServerErrorException('AI returned an invalid notes format.');
      }

      return notesData;

    } catch (aiError) {
      console.error('Error generating notes from OpenAI:', aiError);
      throw new InternalServerErrorException('Failed to generate notes from AI service.');
    }
  }
}
