import { IsArray, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";

export class WhatsAppWebhookDto {
    @IsArray()
    @IsNotEmpty()
    @IsString({ each: true })
    entry: EntryDto[];
}

class EntryDto {
    @IsArray()
    @IsNotEmpty()
    @IsString({ each: true })
    changes: ChangeDto[];
}
class ValueDto {
    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    messages?: MessageDto[];

}
class ChangeDto {
    @IsObject()
    @IsNotEmpty()
    value: ValueDto;
}
class TextDto {
    @IsString()
    @IsNotEmpty()
    body: string;
}

class MessageDto {
    @IsString()
    @IsNotEmpty()
    from: string;

    @IsObject()
    @IsOptional()
    text?: TextDto;
}

