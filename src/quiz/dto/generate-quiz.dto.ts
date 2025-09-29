import { IsString, MinLength } from 'class-validator';

/**
 * Defines the expected data structure for the quiz generation request body.
 * This is used for both type-checking and automated validation.
 */
export class GenerateQuizDto {
  /**
   * The full transcript text extracted from the YouTube video.
   * It must be a string and have at least 150 characters to be valid.
   */
  @IsString()
  @MinLength(150, {
    message: 'Transcript is too short to generate a meaningful quiz.',
  })
  transcript: string;
}
