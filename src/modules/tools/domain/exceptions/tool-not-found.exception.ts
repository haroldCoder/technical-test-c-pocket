import { BaseException } from "@/core/domain/exceptions";
import { HttpStatus } from "@nestjs/common";

export class ToolNotFoundException extends BaseException {
    constructor(intent: string) {
        super(`Tool not found for intent: ${intent}`, HttpStatus.NOT_FOUND);
        this.name = "ToolNotFoundException";
    }
}