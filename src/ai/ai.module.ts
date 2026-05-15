import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { GroqService } from './providers/groq.service';
import { GroqProvider } from './providers/groq.provider';

@Module({
  controllers: [AiController],
  providers: [AiService, GroqService, GroqProvider],
  exports: [AiService],
})
export class AiModule {}