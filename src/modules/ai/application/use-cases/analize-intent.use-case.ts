import { Injectable } from "@nestjs/common";
import { AIService } from "../../domain/services";
import { MessageRequiredException } from "@/core/domain/exceptions";

@Injectable()
export class AnalizeIntentUseCase {
    constructor(private readonly aiService: AIService) { }

    async execute(message: string): Promise<{ intent: string, entities: Record<string, string> }> {
        if (!message) {
            throw new MessageRequiredException();
        }
        return this.aiService.analizeIntent(message);
    }
}