import { Injectable } from "@nestjs/common";
import { AIService } from "src/modules/ai/domain/services";
import { ToolRouterService } from "src/modules/tools/application/services";
import { UserService } from "src/modules/users/application/services";
import { WhatsAppService } from "../ports";
import { CreateMessageUseCase } from "../use-cases";
import { TwilioProvider } from "../../infrastructure/whatsapp";

@Injectable()
export class ProcessIncomingMessageService {

    constructor(
        private readonly userService: UserService,
        private readonly aiService: AIService,
        private readonly toolRouter: ToolRouterService,
        private readonly createMessage: CreateMessageUseCase,
        private readonly whatsappService: WhatsAppService,
        private readonly twilioProvider: TwilioProvider,
    ) { }

    async execute(provider: "twilio" | "whatsapp", message: string, phone: string) {

        const user = await this.userService.findOrCreate(phone);

        console.log(user);

        // Guardar mensaje del usuario
        await this.createMessage.execute({
            userId: user.id,
            content: message,
            role: "USER",
        });

        const intent = await this.aiService.analizeIntent(message);

        const toolResult = await this.toolRouter.route(
            intent.intent,
            intent.entities
        );

        const response = await this.aiService.generateResponse(toolResult);

        // Guardar respuesta del bot
        await this.createMessage.execute({
            userId: user.id,
            content: response,
            role: "ASSISTANT",
        });

        switch (provider) {
            case "twilio":
                await this.twilioProvider.sendTextMessage(phone, response);
                break;
            default:
                await this.whatsappService.sendTextMessage(phone, response);
                break;
        }
    }

}