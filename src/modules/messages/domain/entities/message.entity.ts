export class MessageEntity {
    constructor(
        public readonly id: string,
        public readonly content: string,
        public readonly role: "USER" | "ASSISTANT",
        public readonly userId: string,
        public readonly createdAt: Date
    ) { }
}