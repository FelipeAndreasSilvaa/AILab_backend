import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // Criar nova conversa
  async create(
    userId: string,
    title = 'Nova conversa',
  ) {
    return this.prisma.chat.create({
      data: {
        userId,
        title,
      },
    });
  }

  // Buscar conversa por ID com mensagens
  async findById(chatId: string) {
    const chat =
      await this.prisma.chat.findUnique({
        where: {
          id: chatId,
        },
        include: {
          messages: {
            orderBy: {
              createdAt: 'asc',
            },
          },
        },
      });

    if (!chat) {
      throw new NotFoundException(
        'Conversa não encontrada.',
      );
    }

    return chat;
  }

  // Salvar mensagem
  async saveMessage(
    chatId: string,
    role: 'USER' | 'ASSISTANT',
    content: string,
  ) {
    return this.prisma.message.create({
      data: {
        chatId,
        role,
        content,
      },
    });
  }

  // Listar chats do usuário
  async getUserChats(
    userId: string,
  ) {
    return this.prisma.chat.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Atualizar título da conversa (opcional)
  async updateTitle(
    chatId: string,
    title: string,
  ) {
    return this.prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        title,
      },
    });
  }

  // Remover conversa
  async remove(chatId: string) {
    // Se o relacionamento não estiver com onDelete: Cascade,
    // removemos as mensagens primeiro.
    await this.prisma.message.deleteMany({
      where: {
        chatId,
      },
    });

    return this.prisma.chat.delete({
      where: {
        id: chatId,
      },
    });
  }
}