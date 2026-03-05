import { Injectable } from "@nestjs/common";
import { MessageRepository } from "../../domain/repositories";
import { MessageEntity } from "../../domain/entities";

@Injectable()
export class CreateMessageUseCase {

    constructor(
        private readonly messageRepository: MessageRepository
    ) { }

    async execute(data: {
        content: string
        role: "USER" | "ASSISTANT"
        userId: string
    }) {

        const message = new MessageEntity( // usamos la entidad para crear el mensaje
            crypto.randomUUID(),
            data.content,
            data.role,
            data.userId,
            new Date()
        )

        await this.messageRepository.save(message) // guardamos el mensaje segun el repositorio que se inyecte

        return message
    }
}