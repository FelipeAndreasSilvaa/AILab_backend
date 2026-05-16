import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import pdfParse from 'pdf-parse';

import { PrismaService } from 'src/prisma/prisma.service';
import { AiService } from 'src/ai/ai.service';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly aiService: AiService,
  ) {}

  // Upload do PDF e extração do texto.
  async create(userId: string, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Arquivo PDF não enviado.');
    }

    const pdf = await pdfParse(file.buffer);

    const document = await this.prisma.document.create({
      data: {
        userId,
        title: file.originalname,
        extractedText: pdf.text,
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    });

    return {
      message: 'PDF enviado com sucesso.',
      document,
    };
  }

  // Lista todos os documentos do usuário logado.
  async findAll(userId: string) {
    return this.prisma.document.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    });
  }

  //  Busca um documento específico.
  async findOne(userId: string, documentId: string) {
    const document = await this.prisma.document.findFirst({
      where: {
        id: documentId,
        userId,
      },
      select: {
        id: true,
        title: true,
        extractedText: true,
        createdAt: true,
      },
    });

    if (!document) {
      throw new NotFoundException('Documento não encontrado.');
    }

    return document;
  }

  //  Faz uma pergunta sobre o PDF.
  async ask(userId: string, documentId: string, question: string) {
    const document = await this.prisma.document.findFirst({
      where: {
        id: documentId,
        userId,
      },
      select: {
        title: true,
        extractedText: true,
      },
    });

    if (!document) {
      throw new NotFoundException('Documento não encontrado.');
    }

    const answer = await this.aiService.askAboutPdf(
      document.extractedText,
      question,
    );

    return {
      documentTitle: document.title,
      question,
      answer,
    };
  }

  // Atualiza o título do documento.
  async update(
    userId: string,
    documentId: string,
    updateDocumentDto: UpdateDocumentDto,
  ) {
    const document = await this.prisma.document.findFirst({
      where: {
        id: documentId,
        userId,
      },
    });

    if (!document) {
      throw new NotFoundException('Documento não encontrado.');
    }

    return this.prisma.document.update({
      where: {
        id: documentId,
      },
      data: {
        title: updateDocumentDto.title,
      },
      select: {
        id: true,
        title: true,
        updatedAt: true,
      },
    });
  }


  //  Remove o documento.
  async remove(userId: string, documentId: string) {
    const document = await this.prisma.document.findFirst({
      where: {
        id: documentId,
        userId,
      },
    });

    if (!document) {
      throw new NotFoundException('Documento não encontrado.');
    }

    await this.prisma.document.delete({
      where: {
        id: documentId,
      },
    });

    return {
      message: 'Documento removido com sucesso.',
    };
  }
}