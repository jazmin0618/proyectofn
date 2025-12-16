import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class IaService {
    private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    });

    async recomendarIA(pregunta: string) {
        const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        max_tokens: 150,
        temperature: 0.7,
        messages: [
            { role: 'system', 
              content: 
              'Eres un asistente útil que proporciona recomendaciones basadas en IA.' 
            },
            { role: 'user', 
              content: pregunta 
            },
        ],
        });
        return response.choices[0].message;
    }
}
