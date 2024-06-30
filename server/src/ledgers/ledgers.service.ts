import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ledger } from './entities/ledger.entity';
import { Between, LessThan, Repository } from 'typeorm';
import ConsumptionFilters from './types/consumptionFilters';
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
