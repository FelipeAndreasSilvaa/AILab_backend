import { Inject, Injectable } from '@nestjs/common';
import Groq from 'groq-sdk';
import { SYSTEM_PROMPT } from '../prompts/system.prompt';
import { GROQ_CLIENT } from './groq.provider';

@Injectable()
export class GroqService {

    constructor(
        @Inject(GROQ_CLIENT)
        private readonly groq: Groq,
      ) {}

    async chat(message: string): Promise<string>{
        const response = await this.groq.chat.completions.create({
            model: process.env.GROQ_MODEL ||  'llama-3.3-70b-versatile',
            messages: [
                {
                    role: "system",
                    content: SYSTEM_PROMPT,
                },
                {
                    role: "user",
                    content: message,
                }
            ],
            temperature: 0.7
        })
        return (
            response.choices[0]?.message?.content || "Sem resposta"
        )
    }
}