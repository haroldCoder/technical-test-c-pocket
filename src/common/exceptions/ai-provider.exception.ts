import { BaseException } from "@/core/domain/exceptions";
import { HttpStatus } from "@nestjs/common";

export class AIProviderException extends BaseException {
    constructor(message: string) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR);
        this.name = "AIProviderException";
    }
}