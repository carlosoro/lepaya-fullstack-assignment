import { Injectable } from '@nestjs/common';
import { FruityViceClient } from './clients/fruityvice.client';
import { FruitsRepository } from './fruits.repository';
import { FruitNutricionalInfo } from './types';
import { Fruit } from './fruit.entity';

@Injectable()
export class FruitsService {
    constructor(
        private readonly fruitsRepository: FruitsRepository,
        private readonly fruityViceClient: FruityViceClient
    ) { }

    async getFruitNutritionalValue(fruitId: number): Promise<FruitNutricionalInfo> | null {
        const fruitData = await this.fruitsRepository.getById(fruitId);
        if (!fruitData) {
            throw new Error('Fruit not found');
        }
        const fruitStats = await this.fruityViceClient.getById(fruitData.fruityvice_id);
        if (!fruitStats) {
            return {
                calories: 0,
                carbohydrates: 0,
                fat: 0,
                protein: 0,
                sugar: 0,
            };
        }
        return fruitStats.nutritions;
    }

    getFruitById(fruitId: number): Promise<Fruit> {
        return this.fruitsRepository.getById(fruitId);
    }

}
