import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fruit } from './fruit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FruitsService {
    constructor(
        @InjectRepository(Fruit)
        private fruitsRepository: Repository<Fruit>,
    ) { }

    getFruitReports() {
        //get all ledgers for the fruit_id, location and year
        return 'report';
    }
}
