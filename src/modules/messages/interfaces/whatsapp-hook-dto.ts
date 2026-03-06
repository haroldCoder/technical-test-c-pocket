import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";

export class MessageDto {
    @ApiProperty({ description: "Sender's phone number" })
    @IsString()
    @IsNotEmpty()
    from: string;

    @ApiProperty({ description: "Text object containing message body", required: false })
    @IsString()
    @IsNotEmpty()
    text: string;
}

