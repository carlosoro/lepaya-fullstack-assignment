import { Injectable } from '@nestjs/common';
import { FruityViceClient } from './clients/fruityvice.client';
import { FruitsRepository } from './fruits.repository';
import { FruitNutricionalInfo, FruitPurchaseRequest } from './types';
import { Fruit } from './fruit.entity';

@Injectable()
export class FruitsService {
    constructor(
        private readonly fruitsRepository: FruitsRepository,
        private readonly fruityViceClient: FruityViceClient
    ) { }

    async getFruitsNutritionalValue(fruits: FruitPurchaseRequest[]): Promise<FruitNutricionalInfo[]> {
        const fruitStats: FruitNutricionalInfo[] = [];
        const purchaseFruitIds = fruits.map(fruit => fruit.fruitId);
        const fruitsData = await this.fruitsRepository.findByIds(purchaseFruitIds);
        if (!fruitsData) {
            throw new Error('Fruits data not found');
        }
        const fruityStats = await this.fruityViceClient.getAll();
        if (!fruityStats) {
            return [];
        }
        for(const fruitData of fruitsData) {
            const fruityStat = fruityStats.find(fruityStat => fruityStat.id === fruitData.fruityvice_id);
            if (fruityStat) {
                fruitStats.push({
                    id: fruitData.id,
                    fruityvice_id: fruityStat.id,
                    name: fruityStat.name,
                    ...fruityStat.nutritions
                });
            }
        }
        return fruitStats;
    }

    getFruitById(fruitId: number): Promise<Fruit> {
        return this.fruitsRepository.getById(fruitId);
    }

}
