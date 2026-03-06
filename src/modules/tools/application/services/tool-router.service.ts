import { Injectable } from "@nestjs/common";
import { DolarScrapperTool } from "../../infrastrucure/tools";
import { ToolNotFoundException } from "../../domain/exceptions";

@Injectable()
export class ToolRouterService {
    constructor(private readonly dollarTool: DolarScrapperTool) { }

    async route(intent: string, entities: any): Promise<any> {
        switch (intent) {
            case "dolar_price":
                return this.dollarTool.execute();
            default:
                null;
        }
    }
}