import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Ledger } from "./entities/ledger.entity";
import { Between, LessThan, Repository } from "typeorm";
import ConsumptionFilters from "./types/consumptionFilters";

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
}