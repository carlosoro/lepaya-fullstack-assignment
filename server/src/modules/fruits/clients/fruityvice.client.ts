import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { AxiosResponse } from "axios";
import { FruitStats } from "../types";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FruityViceClient {

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService
    ) {}

    async getById(fruityId: number): Promise<FruitStats> | null {
        const baseUrl = this.configService.get<string>('fruityvice.baseUrl');
        try {
            const response =  await this.httpService.axiosRef.get(`${baseUrl}/api/fruit/${fruityId}`);
            return response.data;
        } catch (error) {
            return null;
        }
    }

    async getAll(): Promise<FruitStats[]> | null {
        const baseUrl = this.configService.get<string>('fruityvice.baseUrl');
        try {
            const response =  await this.httpService.axiosRef.get(`${baseUrl}/api/fruit/all`);
            return response.data;
        } catch (error) {
            return null;
        }
    }
}