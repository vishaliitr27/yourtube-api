import { IsString, MinLength } from 'class-validator';

export class GenerateNotesDto {
  @IsString()
  @MinLength(100, {
    message: 'Transcript is too short to generate meaningful notes.',
  })
  transcript: string;
}
