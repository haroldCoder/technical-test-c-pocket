import Twilio from "twilio";
import { WhatsAppService } from "../../application/ports";
import { SendMessageException } from "@/core/domain/exceptions";

export class TwilioProvider implements WhatsAppService {
    private client: ReturnType<typeof Twilio>;

    constructor() {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        this.client = Twilio(accountSid, authToken);
    }

    async sendTextMessage(to: string, message: string): Promise<void> {
        try {
            await this.client.messages.create({
                from: `whatsapp:${process.env.TWILIO_SANDBOX_NUMBER}`, // número de sandbox
                to: `whatsapp:${to}`,
                body: message,
            });
        } catch (error) {
            throw new SendMessageException("Failed to send WhatsApp message via Twilio");
        }
    }
}