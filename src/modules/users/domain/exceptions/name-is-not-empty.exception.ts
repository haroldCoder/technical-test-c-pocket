import { BaseException } from "@/core/domain/exceptions";
import { HttpStatus } from "@nestjs/common";

export class NameIsNotEmptyException extends BaseException {
    constructor() {
        super("Name cannot be empty", HttpStatus.BAD_REQUEST);
        this.name = "NameIsNotEmptyException";
    }
}