import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { NotesService } from './notes.service';
import { GenerateNotesDto } from './dto/generate-notes.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post('generate')
  generateNotes(@Body(new ValidationPipe()) generateNotesDto: GenerateNotesDto) {
    const { videoId, videoTitle, transcript } = generateNotesDto;
    // In the future, you will get the userId from your authentication guard
    const userId = 'placeholder-user-id';
    return this.notesService.generateNotesFromTranscript(userId,videoId,videoTitle , transcript);
  }
}
