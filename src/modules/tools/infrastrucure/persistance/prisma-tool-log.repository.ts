import { Injectable } from "@nestjs/common";
import { ToolLogEntity } from "../../domain/entities";
import { PrismaService } from "@/core/infrastructure/prisma";
import { ToolLogRepository } from "../../domain/repòsitories";

@Injectable()
export class PrismaToolLogRepository implements ToolLogRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(log: ToolLogEntity): Promise<ToolLogEntity> {
        const record = await this.prisma.toolLog.create({
            data: {
                id: log.id,
                toolName: log.toolName,
                input: log.input,
                output: log.output,
                createdAt: log.createdAt,
                messageId: log.messageId,
            },
        });

        return new ToolLogEntity(record);
    }

    async findByMessage(messageId: string): Promise<ToolLogEntity[]> {
        const records = await this.prisma.toolLog.findMany({ where: { messageId } });
        return records.map(r => new ToolLogEntity({
            id: r.id,
            messageId: r.messageId,
            toolName: r.toolName,
            input: r.input,
            output: r.output,
            createdAt: r.createdAt,
        }));
    }
}