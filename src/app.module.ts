import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { DocumentsModule } from './documents/documents.module';
import { SpeechtotextModule } from './speechtotext/speechtotext.module';
import { OcrModule } from './ocr/ocr.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, ChatModule, DocumentsModule, SpeechtotextModule, OcrModule,],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
