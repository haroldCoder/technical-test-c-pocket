import { Module } from "@nestjs/common";
import { UserService } from "./application/services";
import { UserRepository } from "./domain/repositories";
import { PrismaUserRepository } from "./infrastructure";
import { UserController } from "./presentation";

@Module({
    controllers: [UserController],
    providers: [
        UserService,
        {
            provide: UserRepository,
            useClass: PrismaUserRepository
        }
    ],
    exports: [UserService]
})
export class UsersModule { }