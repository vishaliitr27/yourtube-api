import { IsString, MinLength } from 'class-validator';

export class GenerateQuizDto {
  @IsString()
  @MinLength(100, {
    message: 'Transcript is too short to generate a meaningful quiz.',
  })
  transcript: string;
}

