import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/core/infrastructure/prisma";

import { MessageRepository } from "../../domain/repositories";
import { MessageEntity } from "../../domain/entities";

@Injectable()
export class PrismaMessageRepository implements MessageRepository {

    constructor(private readonly prisma: PrismaService) { }

    async save(message: MessageEntity): Promise<void> {

        await this.prisma.message.create({
            data: {
                id: message.id,
                content: message.content,
                role: message.role,
                userId: message.userId,
                createdAt: message.createdAt
            }
        })

    }

    async findConversation(userId: string): Promise<MessageEntity[]> {

        const messages = await this.prisma.message.findMany({
            where: { userId },
            orderBy: { createdAt: "asc" }
        })

        return messages.map(
            m =>
                new MessageEntity(
                    m.id,
                    m.content,
                    m.role,
                    m.userId,
                    m.createdAt
                )
        )

    }
}