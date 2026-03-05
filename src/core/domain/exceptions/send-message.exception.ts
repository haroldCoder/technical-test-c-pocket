export class SendMessageException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "SendMessageException";
    }
}