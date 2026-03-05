import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../domain/repositories";

@Injectable()
export class UserService { // lo creamos como un servicio para poder decidir si lo buscamos o lo creamos
    constructor(private readonly userRepository: UserRepository) { }

    async findOrCreate(phone: string) {
        let user = await this.userRepository.findByPhone(phone);

        if (!user) {
            user = await this.userRepository.create(phone);
        }

        return user;
    }
}