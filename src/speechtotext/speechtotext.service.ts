import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Groq } from 'groq-sdk';
import { Readable } from 'stream';

@Injectable()
export class SpeechtotextService {
  private groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  async transcribe(file: Express.Multer.File): Promise<string> {
    try {
      const stream = Readable.from(file.buffer);

      const transcription = await this.groq.audio.transcriptions.create({
        file: Object.assign(stream, {
          name: file.originalname,
        }) as any,
        model: 'whisper-large-v3-turbo',
        language: 'pt',
        response_format: 'json',
        temperature: 0,
      });

      return transcription.text;
    } catch (error) {
      console.error('Erro ao transcrever áudio:', error);
      throw new InternalServerErrorException('Erro ao transcrever o áudio.');
    }
  }
}