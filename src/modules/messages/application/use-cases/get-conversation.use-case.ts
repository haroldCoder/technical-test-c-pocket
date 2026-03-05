import { Injectable } from "@nestjs/common";
import { MessageRepository } from "../../domain/repositories";

@Injectable()
export class GetConversationUseCase {

    constructor(
        private readonly messageRepository: MessageRepository
    ) { }

    async execute(userId: string) {
        return this.messageRepository.findConversation(userId)
    }
}