import { Tool } from "../../domain/tools";
import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class DolarScrapperTool implements Tool {
    name: string = "dolar-scrapper";
    async execute(): Promise<any> {
        const { data } = await axios.get("https://api.exchangerate-api.com/v4/latest/USD");

        return {
            usd_cop: data.rates.COP
        };
    }
}