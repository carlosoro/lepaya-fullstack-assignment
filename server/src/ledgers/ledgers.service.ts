import { Injectable } from '@nestjs/common';
import { Ledger } from './entities/ledger.entity';
import { ConsumptionFilters } from './types';
import { LedgersRepository } from './ledgers.repository';

@Injectable()
export class LedgersService {

    constructor(
        private readonly ledgersRepository: LedgersRepository
    ) { }

    getConsumptions(consumptionFilters: ConsumptionFilters): Promise<Ledger[]> {
        return this.ledgersRepository.getConsumptions(consumptionFilters);
    }
}
