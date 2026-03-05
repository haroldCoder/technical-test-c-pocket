import { Module } from "@nestjs/common";
import { DolarScrapperTool } from "./infrastrucure/tools";
import { ToolRouterService } from "./application/services";

@Module({
    providers: [
        DolarScrapperTool,
        ToolRouterService
    ],
    exports: [ToolRouterService]
})
export class ToolsModule { }