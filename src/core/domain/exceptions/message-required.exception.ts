import { BaseException } from "./base.exception";
import { HttpStatus } from "@nestjs/common";

export class MessageRequiredException extends BaseException { // lo ponemos aqui por que es una excepcion de regla de negocio
    constructor() {
        super("Message is required", HttpStatus.BAD_REQUEST);
        this.name = "MessageRequiredException";
    }
}