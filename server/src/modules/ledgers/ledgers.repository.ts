import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Ledger } from "./entities/ledger.entity";
import { Between, LessThan, Repository } from "typeorm";
import { ConsumptionFilters, FruitPurchaseItem, InsertedPurchase } from "./types";
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

    async bulkCreate(fruitsPurchase: FruitPurchaseItem[]): Promise<InsertedPurchase[]>{
        const insertResult = await this.ledgersRepository.insert(fruitsPurchase.map(fruitPurchase => ({
            location_id: fruitPurchase.locationId,
            fruit_id: fruitPurchase.fruitId,
            amount: fruitPurchase.amount
        })));
        console.log(insertResult);
        const insertedIds = insertResult.identifiers as InsertedPurchase[];
        return insertedIds;
    }
}