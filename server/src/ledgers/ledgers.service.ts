import { Injectable } from '@nestjs/common';
import { Ledger } from './entities/ledger.entity';
import { ConsumptionFilters, InsertedPurchase } from './types';
import { LedgersRepository } from './ledgers.repository';
import { CreatePurchaseDto } from './dtos/createPurchase.dto';
import { FruitsService } from './../fruits/fruits.service';
import { GetReportDto } from './dtos/getReport.dto';
import { Location } from './../locations/location.entity';
import { Consumption, Report } from './types';
import { LocationsService } from './../locations/locations.service';
import { FruitNutricionalInfo } from 'src/fruits/types';

@Injectable()
export class LedgersService {

    constructor(
        private readonly ledgersRepository: LedgersRepository,
        private readonly locationsService: LocationsService,
        private readonly fruitsService: FruitsService
    ) { }

    async createPurchase(createPurchaseDto: CreatePurchaseDto): Promise<InsertedPurchase> {
        const fruitNutritionalValue: FruitNutricionalInfo = await this.fruitsService.getFruitNutritionalValue(createPurchaseDto.fruitId);
        const totalCalories: number = fruitNutritionalValue.calories * createPurchaseDto.amount;
        if (totalCalories > 1000) {
            throw new Error('Calories limit exceeded, is not possible to register this purchase');
        }
        try {
             return this.ledgersRepository.createPurchase(createPurchaseDto);
        } catch (error) {
            throw new Error('An error occurred while creating the purchase');
        }
    }

    async getFruitReports(getReportDto: GetReportDto): Promise<Report> {
        const consumptions = await this.getConsumptions({
            year: getReportDto.year,
            locationId: getReportDto.locationId
        });
        if (!consumptions.length) {
            return {
                mostConsumedFruit: null,
                averageFruitConsumption: 0,
            };
        }
        const mostConsumedFruit: Consumption = this.getMostConsumedFruit(consumptions);
        const averageFruitConsumption: number = await this.getAverageFruitConsumption(consumptions, getReportDto.locationId);
        return {
            mostConsumedFruit,
            averageFruitConsumption,
        };
    }

    private getConsumptions(consumptionFilters: ConsumptionFilters): Promise<Ledger[]> {
        return this.ledgersRepository.getConsumptions(consumptionFilters);
    }

    private getMostConsumedFruit(consumedFruits: Ledger[]): Consumption | null {
        const consumptionByFruit: Consumption[] = [];
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
