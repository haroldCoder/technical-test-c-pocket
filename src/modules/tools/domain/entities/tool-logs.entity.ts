export class ToolLogEntity {
    id: string;
    messageId: string;
    toolName: string;
    input: any;
    output: any;
    createdAt: Date;

    constructor(params: {
        id?: string;
        messageId: string;
        toolName: string;
        input: any;
        output: any;
        createdAt?: Date;
    }) {
        this.id = params.id ?? crypto.randomUUID();
        this.messageId = params.messageId;
        this.toolName = params.toolName;
        this.input = params.input;
        this.output = params.output;
        this.createdAt = params.createdAt ?? new Date();
    }
}