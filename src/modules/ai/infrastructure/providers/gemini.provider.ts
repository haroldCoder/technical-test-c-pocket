import { Injectable, Logger } from "@nestjs/common";
import { AIService } from "../../domain/services";
import { AIProviderException } from "@/common/exceptions";
import { AIResponseGenerationException } from "../exceptons";
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiProvider implements AIService {
    private readonly logger = new Logger(GeminiProvider.name);
    private genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    private model = this.genAI.getGenerativeModel({ model: 'gemma-3-12b-it' });;

    constructor() { }

    async analizeIntent(message: string): Promise<{ intent: string, entities: Record<string, string> }> {
        try {
            const prompt = `Analyze the following message and return a JSON object with "intent" and "entities" (as a record of strings). 
            Message: "${message}"`;

            const { response } = await this.model.generateContent(prompt);

            let text = response.text();
            text = text.replace(/```json\s*/, "").replace(/```/g, "").trim();

            const parsed = JSON.parse(text);

            return {
                intent: parsed.intent ?? "UNKNOWN",
                entities: parsed.enities ?? {}
            };
        } catch (err) {
            this.logger.error("Gemini analyze intent failed", err);
            throw new AIProviderException("Gemini analyze intent failed: " + err.message);
        }
    }

    async generateResponse(context: any): Promise<string> {
        try {
            const prompt = typeof context === 'string' ? context : "";
            const { response } = await this.model.generateContent(prompt);
            const text = response.text();
            return text;
        } catch (err) {
            this.logger.error("Gemini generate response failed", err);
            throw new AIResponseGenerationException("Error to generate response: " + err.message);
        }
    }
}
