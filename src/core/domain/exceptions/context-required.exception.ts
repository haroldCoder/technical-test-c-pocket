import { BaseException } from "./base.exception";
import { HttpStatus } from "@nestjs/common";

export class ContextRequiredException extends BaseException {
    constructor() {
        super("Context is required", HttpStatus.BAD_REQUEST);
        this.name = "ContextRequiredException";
    }
}