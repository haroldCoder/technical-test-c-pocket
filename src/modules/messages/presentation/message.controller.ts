import { Controller, Get, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetConversationUseCase } from "../application/use-cases";

@ApiTags("Messages")
@Controller("messages")
export class MessageController {
    constructor(
        private readonly getConversationUseCase: GetConversationUseCase
    ) { }

    @Get(":userId")
    @ApiOperation({ summary: "Get conversation history for a user" })
    @ApiResponse({ status: 200, description: "Returns the message history." })
    async getConversation(@Param("userId") userId: string) {
        return this.getConversationUseCase.execute(userId);
    }
}
