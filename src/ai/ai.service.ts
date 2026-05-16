import { Injectable } from '@nestjs/common';
import { GroqService } from './providers/groq.service';

@Injectable()
export class AiService{
    constructor(private readonly groqService: GroqService) {}

    async generate(message: string){
        return this.groqService.chat(message)
    }

    async askAboutPdf(question: string, content: string): Promise<string> {
        // Se não houver texto extraído
        if (!content || !content.trim()) {
          return 'Não foi possível extrair texto deste PDF.';
        }
      
        // Limita o tamanho do contexto enviado ao modelo
        // (slice é síncrono, não precisa de await)
        const limitedContent = content.slice(0, 15000);
      
        const prompt = `
      Você é um assistente especializado em analisar documentos PDF.
      
      Responda APENAS com base no conteúdo do documento abaixo.
      Se a resposta não estiver no documento, responda exatamente:
      "Não encontrei essa informação no PDF."
      
      ================ DOCUMENTO ================
      ${limitedContent}
      ==========================================
      
      Pergunta do usuário:
      ${question}
      `;
      
        return this.groqService.chat(prompt);
    }
}