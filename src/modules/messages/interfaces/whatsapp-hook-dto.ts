import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";

export class WhatsAppWebhookDto {
    @ApiProperty({ description: "Array of entry objects containing changes" })
    @IsArray()
    @IsNotEmpty()
    @IsString({ each: true })
    entry: EntryDto[];
}

class EntryDto {
    @ApiProperty({ description: "Array of changes" })
    @IsArray()
    @IsNotEmpty()
    @IsString({ each: true })
    changes: ChangeDto[];
}

class ValueDto {
    @ApiProperty({ description: "Array of message objects", required: false })
    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    messages?: MessageDto[];
}

class ChangeDto {
    @ApiProperty({ description: "Value object containing messages" })
    @IsObject()
    @IsNotEmpty()
    value: ValueDto;
}

class TextDto {
    @ApiProperty({ description: "Body of the text message" })
    @IsString()
    @IsNotEmpty()
    body: string;
}

class MessageDto {
    @ApiProperty({ description: "Sender's phone number" })
    @IsString()
    @IsNotEmpty()
    from: string;

    @ApiProperty({ description: "Text object containing message body", required: false })
    @IsObject()
    @IsOptional()
    text?: TextDto;
}

