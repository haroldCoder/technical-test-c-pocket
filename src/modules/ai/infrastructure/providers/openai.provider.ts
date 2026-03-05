import { Injectable, Logger } from "@nestjs/common";
import { AIService } from "../../domain/services";
import OpenAI from "openai";
import { AIProviderException } from "@/common/exceptions";
import { AIResponseGenerationException } from "../exceptons";

@Injectable()
export class OpenAIProvider implements AIService {
    constructor() { }

    private readonly logger = new Logger(OpenAIProvider.name); // para poder loggear errores

    private openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    async analizeIntent(message: string): Promise<{ intent: string, entities: Record<string, string> }> {
        try {
            const response = await this.openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "user", content: message },
                ],
            });

            const content = response.choices[0].message.content ?? "{}";

            const parsed = JSON.parse(content);

            return { intent: parsed.intent, entities: parsed.entities };
        } catch (err) {
            this.logger.error("OpenAI analyze intent failed", err);
            throw new AIProviderException("OpenAI analyze intent failed"); // lanzamos la excepcion para que el controlador la maneje
        }
    }

    async generateResponse(context: any): Promise<string> {
        try {
            const response = await this.openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "user", content: context },
                ],
            });

            return response.choices[0].message.content || "";
        } catch (err) {
            this.logger.error("OpenAI generate response failed", err);
            throw new AIResponseGenerationException("Error to generate response" + err);
        }
    }
}