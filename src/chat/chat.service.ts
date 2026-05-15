import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly prisma: PrismaService) {}

  async create(userId: string, title?: string) {
    return this.prisma.chat.create({
      data: {
        userId,
        title
      }
    });
  }

  async findById(chatId: string){
    return this.prisma.chat.findUnique({
      where: {id: chatId},
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      }
    })
  }

  async saveMessage(chatId: string, role: 'USER' | 'ASSISTANT', content: string){
    return this.prisma.message.create({
      data: {
        chatId,
        role, 
        content,
      }
    })
  }

  async getUserChats(userId: string){
    return this.prisma.chat.findMany({
      where: {userId},
      orderBy: { createdAt: 'desc' },
    })
  }


}
