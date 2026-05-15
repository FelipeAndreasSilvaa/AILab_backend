import { Injectable } from '@nestjs/common';
import { GroqService } from './providers/groq.service';

@Injectable()
export class AiService{
    constructor(private readonly groqService: GroqService) {}

    async generate(message: string){
        return this.groqService.chat(message)
    }
}