import { Injectable } from "@nestjs/common";
import { DolarScrapperTool } from "../../infrastrucure/tools";
import { ToolNotFoundException } from "../../domain/exceptions";
import { ToolLogRepository } from "../../domain/repòsitories";
import { ToolLogEntity } from "../../domain/entities";

@Injectable()
export class ToolRouterService {
    constructor(
        private readonly dollarTool: DolarScrapperTool,
        private readonly toolLogRepository: ToolLogRepository
    ) { }

    async route(intent: string, entities: any, messageId?: string): Promise<any> {
        switch (intent) {
            case "dolar_price":
                const result = await this.dollarTool.execute();
                if (messageId) {
                    await this.toolLogRepository.create(
                        new ToolLogEntity({
                            messageId,
                            toolName: intent,
                            input: entities,
                            output: result,
                        })
                    );
                }
            default:
                null;
        }
    }
}