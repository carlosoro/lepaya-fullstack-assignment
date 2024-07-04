import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Fruit } from "./fruit.entity";
import { Repository } from "typeorm";

@Injectable()
export class FruitsRepository {
    constructor(
        @InjectRepository(Fruit)
        private fruitsRepository: Repository<Fruit>
    ) { }

    getById(fruitId: number): Promise<Fruit> {
        return this.fruitsRepository.findOneBy({ id: fruitId});
    }
}