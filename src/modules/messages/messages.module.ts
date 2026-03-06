import { Module } from "@nestjs/common";
import { PrismaMessageRepository } from "./infrastructure/persistance";
import { CreateMessageUseCase, GetConversationUseCase } from "./application/use-cases";
import { MessageRepository } from "./domain/repositories";
import { WhatsAppService } from "./application/ports";
import { TwilioProvider, WhatsAppProvider } from "./infrastructure/whatsapp";
import { ProcessIncomingMessageService } from "./application/services";
import { WhatsAppWebhookController, MessageController } from "./presentation";
import { UserService } from "../users/application/services";
import { AIService } from "../ai/domain/services";
import { GeminiProvider } from "../ai/infrastructure/providers";
import { ToolRouterService } from "../tools/application/services";
import { PrismaUserRepository } from "../users/infrastructure";
import { UserRepository } from "../users/domain/repositories";
import { DolarScrapperTool } from "../tools/infrastrucure/tools";

@Module({
    controllers: [WhatsAppWebhookController, MessageController],
    providers: [
        CreateMessageUseCase,
        GetConversationUseCase,

        {
            provide: MessageRepository,
            useClass: PrismaMessageRepository
        },
        {
            provide: WhatsAppService,
            useClass: WhatsAppProvider
        },
        {
            provide: TwilioProvider,
            useClass: TwilioProvider
        },
        ProcessIncomingMessageService,
        UserService,
        {
            provide: AIService,
            useClass: GeminiProvider
        },
        ToolRouterService,
        {
            provide: UserRepository,
            useClass: PrismaUserRepository
        },
        DolarScrapperTool
    ],
    exports: [
        CreateMessageUseCase,
        GetConversationUseCase,
        ProcessIncomingMessageService
    ]
})

export class MessagesModule { }