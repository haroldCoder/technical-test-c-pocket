import { Injectable } from "@nestjs/common";
import { WhatsAppService } from "../../application/ports";
import axios from "axios";
import { SendMessageException } from "@/core/domain/exceptions";

@Injectable()
export class WhatsAppProvider implements WhatsAppService {

    private readonly token = process.env.WHATSAPP_TOKEN;
    private readonly phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

    async sendTextMessage(to: string, message: string): Promise<void> {
        try {
            await axios.post(
                `https://graph.facebook.com/v19.0/${this.phoneNumberId}/messages`,
                {
                    messaging_product: "whatsapp",
                    to,
                    type: "text",
                    text: {
                        body: message,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                        "Content-Type": "application/json",
                    },
                },
            );
        } catch (error) {
            throw new SendMessageException("Failed to send WhatsApp message");
        }
    }
}