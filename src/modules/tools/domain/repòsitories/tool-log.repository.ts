import { ToolLogEntity } from "../entities";

export abstract class ToolLogRepository {
    abstract create(log: ToolLogEntity): Promise<ToolLogEntity>;
    abstract findByMessage(messageId: string): Promise<ToolLogEntity[]>;
}