export abstract class WhatsAppService { // lo ponemos aqui por que representa una dependecia de caso de uso
    abstract sendTextMessage(
        to: string,
        message: string
    ): Promise<void>;
}