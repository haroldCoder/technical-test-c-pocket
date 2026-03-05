import { UserEntity } from "../entities";

export abstract class UserRepository {
    abstract findByPhone(phone: string): Promise<UserEntity | null>;
    abstract create(phone: string): Promise<UserEntity>;
}