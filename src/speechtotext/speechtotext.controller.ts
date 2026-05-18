import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { SpeechtotextService } from './speechtotext.service';

const ALLOWED_MIMETYPES = [
  'audio/mpeg',
  'audio/mp4',
  'audio/wav',
  'audio/webm',
  'audio/ogg',
  'audio/flac',
  'video/mp4',
  'video/webm',
];

@Controller('speech')
export class SpeechtotextController {
  constructor(private readonly speechtotextService: SpeechtotextService) {}

  @Post('transcribe')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: {
        fileSize: 25 * 1024 * 1024, // 25 MB
      },
    }),
  )
  async transcribe(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado.');
    }

    if (!ALLOWED_MIMETYPES.includes(file.mimetype)) {
      throw new BadRequestException(
        `Formato não suportado: ${file.mimetype}. Envie um arquivo de áudio ou vídeo válido.`,
      );
    }

    const text = await this.speechtotextService.transcribe(file);
    return { text };
  }
}