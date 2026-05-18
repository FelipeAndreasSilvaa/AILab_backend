import { Module } from '@nestjs/common';
import { SpeechtotextService } from './speechtotext.service';
import { SpeechtotextController } from './speechtotext.controller';

@Module({
  controllers: [SpeechtotextController],
  providers: [SpeechtotextService],
})
export class SpeechtotextModule {}
