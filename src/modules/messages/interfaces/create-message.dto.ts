import { IsString, IsEnum, IsNotEmpty } from "class-validator"

export class CreateMessageDto {
    @IsString()
    @IsNotEmpty()
    content: string

    @IsEnum(["USER", "ASSISTANT"])
    @IsNotEmpty()
    role: "USER" | "ASSISTANT"

    @IsString()
    @IsNotEmpty()
    userId: string
}