import { MessageEntity } from "../entities";

export abstract class MessageRepository {

    abstract save(message: MessageEntity): Promise<void>;

    abstract findConversation(userId: string): Promise<MessageEntity[]>;

}