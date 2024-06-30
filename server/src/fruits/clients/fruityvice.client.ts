import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { AxiosResponse } from "axios";
import { FruityViceResponse } from "../types";

export class FruityViceClient {

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService
    ) {}

    getFruitStats(fruitName: string){
    //Promise<AxiosResponse<FruityViceResponse>> 
    //{
        const baseUrl = this.configService.get<string>('fruityvice.baseUrl');
        const response = this.httpService.axiosRef.get(`${baseUrl}/api/fruit/${fruitName}`);
        console.log(response);
    }
}