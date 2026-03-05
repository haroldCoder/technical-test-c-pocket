import { NameIsNotEmptyException, PhoneNumberIsNotEmptyException } from "../exceptions";

export class UserEntity {
    constructor(
        public readonly id: string,
        public phoneNumber: string,
        public name?: string,
        public createdAt?: Date
    ) {
        if (!phoneNumber) {
            throw new PhoneNumberIsNotEmptyException();
        }
    }

    updateName(name: string) {
        if (!name) {
            throw new NameIsNotEmptyException();
        }
        this.name = name;
    }
    static create(phoneNumber: string, name?: string, createdAt?: Date): UserEntity { // creamos metodos para el modelo de negocio
        if (!phoneNumber) {
            throw new PhoneNumberIsNotEmptyException();
        }

        return new UserEntity(
            crypto.randomUUID(),
            phoneNumber,
            name,
            createdAt ?? new Date(),
        );
    }
}