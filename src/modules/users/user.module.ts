import { Module } from "@nestjs/common";
import { UserService } from "./application/services";
import { UserRepository } from "./domain/repositories";
import { PrismaUserRepository } from "./infrastructure";

@Module({
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