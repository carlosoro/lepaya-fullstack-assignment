import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ledger } from './entities/ledger.entity';
import { Between, LessThan, Repository } from 'typeorm';
import ConsumptionFilters from './types/consumptionFilters';

@Injectable()
export class LedgersService {

    constructor(
        @InjectRepository(Ledger)
        private ledgerRepository: Repository<Ledger>
    ) { }

    getConsumptions(ConsumptionFilters: ConsumptionFilters): Promise<Ledger[]> {
        //Move this to a repository class
        return this.ledgerRepository.find({
            where: {
                amount: LessThan(0),
                location_id: ConsumptionFilters.locationId,
                time: Between(`${ConsumptionFilters.year}-01-01`, `${ConsumptionFilters.year}-12-31`)
            }
        });
    }
}
