import { Controller, Get, Post, Query, Body } from "@nestjs/common";
import { ProcessIncomingMessageService } from "../application/services";
import { WhatsAppWebhookDto } from "../interfaces";

@Controller("webhook/whatsapp")
export class WhatsAppWebhookController {
    constructor(
        private readonly processIncomingMessage: ProcessIncomingMessageService
    ) { }

    /**
     * Verificación del webhook (Meta lo exige)
     */
    @Get()
    verifyWebhook(
        @Query("hub.mode") mode: string,
        @Query("hub.challenge") challenge: string,
        @Query("hub.verify_token") token: string
    ) {
        if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
            return challenge;
        }

        return "Verification failed";
    }

    /**
     * Recepción de mensajes de WhatsApp
     */
    @Post()
    async receiveMessage(@Body() body: WhatsAppWebhookDto) {
        try {
            const message = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
            const phone = message?.from;
            const text = message?.text?.body;

            if (!phone || !text) {
                return { status: "ignored" };
            }

            await this.processIncomingMessage.execute("twilio", text, phone);

            return { status: "received" };
        } catch (error) {
            console.error(error);
            return { status: "error" };
        }
    }
}