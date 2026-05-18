import { Injectable } from '@nestjs/common';
import { recognize } from 'tesseract.js';
import sharp from 'sharp';
import { AiService } from 'src/ai/ai.service';

@Injectable()
export class OcrService {
  constructor(
    private readonly aiService: AiService,
  ) {}

  async extractText(buffer: Buffer): Promise<string> {
    // Melhora a imagem antes do OCR
    const processedImage = await sharp(buffer)
      .grayscale()
      .normalize()
      .resize({ width: 2000 })
      .sharpen()
      .png()
      .toBuffer();

    const result = await recognize(processedImage, 'eng');

    return result.data.text;
  }

  async extractStructuredData(
    imageBuffer: Buffer,
  ) {
    const text = await this.extractText(imageBuffer);

    const prompt = `
    Você é um especialista em extração de dados de recibos e notas fiscais.
    
    Analise o texto extraído por OCR e retorne APENAS um JSON válido.
    
    REGRAS:
    - Retorne somente JSON puro.
    - Não use markdown.
    - Não use \`\`\`json.
    - Não inclua explicações.
    - Não invente dados.
    - Se um campo não for encontrado, use null.
    - Valores monetários devem ser números decimais.
    - Datas devem permanecer no formato original caso não seja possível normalizar.
    
    EXTRAIA OS SEGUINTES CAMPOS:
    
    {
      "merchant_name": null,
      "merchant_address": null,
      "merchant_phone": null,
      "date": null,
      "time": null,
      "order_number": null,
      "cashier": null,
      "items": [
        {
          "description": null,
          "quantity": 1,
          "unit_price": null,
          "total_price": null
        }
      ],
      "subtotal": null,
      "tax": null,
      "tip": null,
      "discount": null,
      "total": null,
      "payment_method": null
    }
    
    TEXTO OCR:
    ${text}
    `;

    const response =
      await this.aiService.generate(prompt);

    try {
      return JSON.parse(response);
    } catch {
      return {
        raw_text: text,
        ai_response: response,
      };
    }
  }
}