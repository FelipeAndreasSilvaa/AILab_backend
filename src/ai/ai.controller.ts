import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AiService } from './ai.service';
import { ChatDto } from './dto/chat.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { request } from 'http';

@Controller('ai')
export class AiController{
    constructor(private readonly aiService: AiService) {}

    @UseGuards(JwtAuthGuard)
    @Post('chat')
    async chat(@Body() dto: ChatDto, @Req() req ){
        const response = await this.aiService.generate(dto.message)

        return{
            userId: req.user.id,
            message: dto.message,
            response
        }
    }
}