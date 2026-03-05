import { Injectable } from "@nestjs/common";
import { AIService } from "../../domain/services";
import { ContextRequiredException } from "@/core/domain/exceptions";

@Injectable()
export class GenerateResponseUseCase {
    constructor(private readonly aiService: AIService) { }

    async execute(context: any): Promise<string> {
        if (!context) {
            throw new ContextRequiredException();
        }
        return this.aiService.generateResponse(context);
    }
}