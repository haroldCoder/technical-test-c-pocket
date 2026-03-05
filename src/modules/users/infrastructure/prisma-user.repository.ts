import { Injectable } from "@nestjs/common";
import { UserRepository } from "../domain/repositories";
import { PrismaService } from "@/core/infrastructure/prisma";
import { UserEntity } from "../domain/entities";

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findByPhone(phone: string): Promise<UserEntity | null> {
        const user = await this.prisma.user.findUnique({ where: { phoneNumber: phone } });
        if (!user) {
            return null;
        }
        return new UserEntity(user.id, user.phoneNumber, user.name ?? undefined, user.createdAt);
    }

    async create(phone: string): Promise<UserEntity> {
        const user = await this.prisma.user.create({ data: { phoneNumber: phone } });
        return UserEntity.create(user.phoneNumber, user.name ?? undefined, user.createdAt);
    }
}