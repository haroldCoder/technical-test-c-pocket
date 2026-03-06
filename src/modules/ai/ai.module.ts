import { Module } from "@nestjs/common";
import { GeminiProvider } from "./infrastructure/providers";
import { AIService } from "./domain/services";
import { AnalizeIntentUseCase } from "./application/use-cases";
import { GenerateResponseUseCase } from "./application/use-cases";

@Module({
    providers: [
        AnalizeIntentUseCase,
        GenerateResponseUseCase,
        {
            provide: AIService,
            useClass: GeminiProvider // GeminiProvider(gemini Ia), OpenAIProvider(openAi)
        }
    ],
    exports: [AnalizeIntentUseCase, GenerateResponseUseCase]
})
export class AiModule { }