import { Injectable } from '@nestjs/common';
import { GetReportDto } from './dtos/getReport.dto';
import { LedgersService } from './../ledgers/ledgers.service';
import { Ledger } from './../ledgers/entities/ledger.entity';
import { LocationsService } from './../locations/locations.service';
import { Location } from './../locations/location.entity';
import { FruitConsumption, FruitReport } from './types';
import { FruityViceClient } from './clients/fruityvice.client';
import { FruitsRepository } from './fruits.repository';

@Injectable()
export class FruitsService {
    constructor(
        private readonly ledgersService: LedgersService,
        private readonly locationsService: LocationsService,
        private readonly fruitsRepository: FruitsRepository,
        private readonly fruityViceClient: FruityViceClient
    ) { }

    async getFruitReports(getReportDto: GetReportDto): Promise<FruitReport> {
        const consumptions = await this.ledgersService.getConsumptions({
            year: getReportDto.year,
            locationId: getReportDto.locationId
        });
        if (!consumptions.length) {
            return {
                mostConsumedFruit: null,
                averageFruitConsumption: 0,
            };
        }
        const mostConsumedFruit: FruitConsumption = this.getMostConsumedFruit(consumptions);
        const averageFruitConsumption: number = await this.getAverageFruitConsumption(consumptions, getReportDto.locationId);
        return {
            mostConsumedFruit,
            averageFruitConsumption,
        };
    }

    async getFruitNutritionalValue(fruitId: number) {
        const fruit = this.fruitsRepository.getById(fruitId);
        console.log(fruit);
        // const fruit = await this.fruityViceClient.getFruitById(fruitId);
    }

    private getMostConsumedFruit(consumedFruits: Ledger[]): FruitConsumption | null {
        const consumptionByFruit: FruitConsumption[] = [];
        if (!consumedFruits.length) {
            return null;
        }
        consumedFruits.forEach(consumedFruit => {
            const index = consumptionByFruit.findIndex(fruit => fruit.fruitId === consumedFruit.fruit_id);
            if (index === -1) {
                consumptionByFruit.push({
                    fruitId: consumedFruit.fruit_id,
                    amount: Math.abs(consumedFruit.amount),
                    name: consumedFruit.fruit.name,
                });
            } else {
                consumptionByFruit[index].amount += Math.abs(consumedFruit.amount);
            }
        });
        consumptionByFruit.sort((a, b) => b.amount - a.amount);
        return consumptionByFruit[0];
    }

    private async getAverageFruitConsumption(consumedFruits: Ledger[], locationId: number): Promise<number> {
        const location: Location = await this.locationsService.getLocationById(locationId);
        if (!location) {
            return 0;
        }
        const totalConsumption: number = consumedFruits.reduce((total: number, consumedFruit: Ledger): number => {
            return consumedFruit.amount < 0 ? total + Math.abs(consumedFruit.amount) : total;
        }, 0);
        return totalConsumption / location.headcount;
    }
}
