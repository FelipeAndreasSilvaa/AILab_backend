import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import { DocumentsService } from './documents.service';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { AskDocumentDto } from './dto/ask-document.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
  };
}

@Controller('documents')
@UseGuards(JwtAuthGuard)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  //  Upload de um PDF
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
      fileFilter: (req, file, callback) => {
        if (file.mimetype !== 'application/pdf') {
          return callback(
            new BadRequestException(
              'Apenas arquivos PDF são permitidos.',
            ),
            false,
          );
        }

        callback(null, true);
      },
    }),
  )
  upload(
    @Req() req: AuthenticatedRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.documentsService.create(req.user.id, file);
  }

  // Faz uma pergunta sobre um PDF
  @Post(':id/ask')
  ask(
    @Req() req: AuthenticatedRequest,
    @Param('id') documentId: string,
    @Body() dto: AskDocumentDto,
  ) {
    return this.documentsService.ask(
      req.user.id,
      documentId,
      dto.question,
    );
  }

  // Lista todos os documentos do usuário logado
  @Get()
  findAll(@Req() req: AuthenticatedRequest) {
    return this.documentsService.findAll(req.user.id);
  }

  // Busca um documento específico
  @Get(':id')
  findOne(
    @Req() req: AuthenticatedRequest,
    @Param('id') documentId: string,
  ) {
    return this.documentsService.findOne(
      req.user.id,
      documentId,
    );
  }

  // Atualiza o título do documento
  @Patch(':id')
  update(
    @Req() req: AuthenticatedRequest,
    @Param('id') documentId: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentsService.update(
      req.user.id,
      documentId,
      updateDocumentDto,
    );
  }

  // Remove um documento
  @Delete(':id')
  remove(
    @Req() req: AuthenticatedRequest,
    @Param('id') documentId: string,
  ) {
    return this.documentsService.remove(
      req.user.id,
      documentId,
    );
  }
}