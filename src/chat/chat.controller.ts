import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ChatService } from './chat.service';
import { AiService } from '../ai/ai.service';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService, private readonly aiService: AiService) {}
  @Post()
  async createChat(@Req() req: any) {
    return this.chatService.create(
      req.user.id,
      'Nova conversa',
    );
  }

  @Get()
  async listChats(@Req() req: any) {
    return this.chatService.getUserChats(
      req.user.id,
    );
  }


  @Get(':chatId')
  async getChat(@Param('chatId') chatId: string) {
    return this.chatService.findById(chatId);
  }


  @Post(':chatId/messages')
  async sendMessage(
    @Param('chatId') chatId: string,
    @Body('message') message: string,
  ) {
    // salva mensagem do usuário
    await this.chatService.saveMessage(
      chatId,
      'USER',
      message,
    );

    // gera resposta da IA
    const response =
      await this.aiService.generate(
        message,
      );

    // salva resposta da IA
    await this.chatService.saveMessage(
      chatId,
      'ASSISTANT',
      response,
    );

    return {
      message,
      response,
    };
  }
}
