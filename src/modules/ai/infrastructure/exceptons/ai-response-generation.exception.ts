import { BaseException } from "@/core/domain/exceptions";
import { HttpStatus } from "@nestjs/common";

export class AIResponseGenerationException extends BaseException {
    constructor(message: string) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR);
        this.name = "AIResponseGenerationException";
    }
}