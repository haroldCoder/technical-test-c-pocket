import { Module } from "@nestjs/common";
import { DolarScrapperTool } from "./infrastrucure/tools";
import { ToolRouterService } from "./application/services";
import { PrismaToolLogRepository } from "./infrastrucure/persistance/prisma-tool-log.repository";
import { ToolLogRepository } from "./domain/repòsitories";

@Module({
    providers: [
        DolarScrapperTool,
        ToolRouterService,
        {
            useClass: PrismaToolLogRepository,
            provide: ToolLogRepository
        }
    ],
    exports: [ToolRouterService]
})
export class ToolsModule { }