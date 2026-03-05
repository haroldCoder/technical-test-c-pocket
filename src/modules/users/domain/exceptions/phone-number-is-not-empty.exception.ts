import { BaseException } from "@/core/domain/exceptions";
import { HttpStatus } from "@nestjs/common";

export class PhoneNumberIsNotEmptyException extends BaseException {
    constructor() {
        super("Phone number cannot be empty", HttpStatus.BAD_REQUEST);
        this.name = "PhoneNumberIsNotEmptyException";
    }
}