import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Ledger } from "./entities/ledger.entity";
import { Between, LessThan, Repository } from "typeorm";
import { ConsumptionFilters, InsertedPurchase } from "./types";
import { CreatePurchaseDto } from "./dtos/createPurchase.dto";

@Injectable()
export class LedgersRepository {
    constructor(
        @InjectRepository(Ledger)
        private ledgersRepository: Repository<Ledger>
    ) { }

    getConsumptions(consumptionFilters: ConsumptionFilters): Promise<Ledger[]> {
        return this.ledgersRepository.find({
            where: {
                amount: LessThan(0),
                location_id: consumptionFilters.locationId,
                time: Between(`${consumptionFilters.year}-01-01`, `${consumptionFilters.year}-12-31`)
            }
        });
    }

    async createPurchase(createPurchaseDto: CreatePurchaseDto): Promise<InsertedPurchase>{
        const insertResult = await this.ledgersRepository.insert({
            amount: createPurchaseDto.amount,
            fruit_id: createPurchaseDto.fruitId,
            location_id: createPurchaseDto.locationId,
            time: new Date().toISOString()
        });
        const insertedId: InsertedPurchase = {
            id: insertResult.generatedMaps[0].id
        };
        return insertedId;
    }
}