import { Module } from "@nestjs/common";
import { OpenAIProvider } from "./infrastructure/providers/openai.provider";
import { AIService } from "./domain/services";
import { AnalizeIntentUseCase } from "./application/use-cases";
import { GenerateResponseUseCase } from "./application/use-cases";

@Module({
    providers: [
        AnalizeIntentUseCase,
        GenerateResponseUseCase,
        {
            provide: AIService,
            useClass: OpenAIProvider
        }
    ],
    exports: [AnalizeIntentUseCase, GenerateResponseUseCase]
})
export class AiModule { }