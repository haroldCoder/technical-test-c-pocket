import { Controller, Get, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ToolLogRepository } from "../domain/repòsitories";

@ApiTags("Tools")
@Controller("tools")
export class ToolController {
    constructor(
        private readonly toolLogRepository: ToolLogRepository
    ) { }

    @Get("logs/:messageId")
    @ApiOperation({ summary: "Get tool logs for a specific message" })
    @ApiResponse({ status: 200, description: "Returns the tool logs." })
    async getLogs(@Param("messageId") messageId: string) {
        return this.toolLogRepository.findByMessage(messageId);
    }
}
