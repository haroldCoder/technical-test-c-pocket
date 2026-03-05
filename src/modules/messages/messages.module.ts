import { Module } from "@nestjs/common";
import { PrismaMessageRepository } from "./infrastructure/prisma-message.repository";
import { CreateMessageUseCase, GetConversationUseCase } from "./application/use-cases";
import { MessageRepository } from "./domain/repositories";

@Module({
    providers: [
        CreateMessageUseCase,
        GetConversationUseCase,

        {
            provide: MessageRepository,
            useClass: PrismaMessageRepository
        }
    ],
    exports: [
        CreateMessageUseCase,
        GetConversationUseCase
    ]
})

export class MessagesModule { }