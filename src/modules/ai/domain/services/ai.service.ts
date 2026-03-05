export abstract class AIService { // lo declaramos como un servicio por que es una clase que va a tener logica externa
    abstract analizeIntent(message: string): Promise<{
        intent: string,
        entities: Record<string, string>
    }>;

    abstract generateResponse(context: any): Promise<string>;
}