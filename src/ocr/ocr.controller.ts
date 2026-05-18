import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import { OcrService } from './ocr.service';

@Controller('ocr')
export class OcrController {
  constructor(private readonly ocrService: OcrService) {}

  @Post('extract')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
      fileFilter: (req, file, callback) => {
        const allowedTypes = [
          'image/png',
          'image/jpeg',
          'image/jpg',
        ];

        if (!allowedTypes.includes(file.mimetype)) {
          return callback(
            new BadRequestException(
              'Apenas PNG, JPG e JPEG são permitidos.',
            ),
            false,
          );
        }

        callback(null, true);
      },
    }),
  )
  async extract(
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException(
        'Nenhuma imagem enviada.',
      );
    }

    const text = await this.ocrService.extractStructuredData(
      file.buffer,
    );

    return {
      filename: file.originalname,
      text,
    };
  }
}