import { Injectable } from '@nestjs/common';
import { Ledger } from './entities/ledger.entity';
import { ConsumptionFilters, InsertedPurchase } from './types';
import { LedgersRepository } from './ledgers.repository';
import { CreatePurchaseDto } from './dtos/createPurchase.dto';
import { FruitsService } from './../fruits/fruits.service';
import { GetReportDto } from './dtos/getReport.dto';
import { Location } from '../locations/location.entity';
import { Consumption, Report } from './types';
import { LocationsService } from '../locations/locations.service';
import { AppError } from '../../utils/appErrorHandler';

@Injectable()
export class LedgersService {

    constructor(
        private readonly ledgersRepository: LedgersRepository,
        private readonly locationsService: LocationsService,
        private readonly fruitsService: FruitsService
    ) { }

    async createPurchase(createPurchaseDto: CreatePurchaseDto): Promise<InsertedPurchase> {
        try {
            await this.validatePurchaseInput(createPurchaseDto);
            const fruitNutritionalValue = await this.fruitsService.getFruitNutritionalValue(createPurchaseDto.fruitId);
            const totalCalories = fruitNutritionalValue.calories * createPurchaseDto.amount;
            if (totalCalories > 1000) {
                throw new AppError(
                    'Calories limit exceeded, is not possible to register this purchase',
                    400
                );
            }
            return await this.ledgersRepository.createPurchase(createPurchaseDto);
        } catch (error) {
            //TODO: add logging here
            throw error;
        }
    }

    async getConsumptionReports(getReportDto: GetReportDto): Promise<Report> {
        try {
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
        } catch (error) {
            //TODO: add logging here
            throw error;
        }
    }

    private getConsumptions(consumptionFilters: ConsumptionFilters): Promise<Ledger[]> {
        return this.ledgersRepository.getConsumptions(consumptionFilters);
    }

    private getMostConsumedFruit(consumedFruits: Ledger[]): Consumption | null {
        const consumptionByFruit: Consumption[] = [];
        if (!consumedFruits.length) {
            return null;
        }
        for (const consumedFruit of consumedFruits) {
            const consumption = consumptionByFruit.find(fruit => fruit.fruitId === consumedFruit.fruit_id);
            if (!consumption) {
                consumptionByFruit.push({
                    fruitId: consumedFruit.fruit_id,
                    amount: Math.abs(consumedFruit.amount),
                    name: consumedFruit.fruit.name,
                });
            } else {
                consumption.amount += Math.abs(consumedFruit.amount);
            }
        }
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

    private async validatePurchaseInput(createPurchaseDto: CreatePurchaseDto): Promise<void> {
        const location = await this.locationsService.getLocationById(createPurchaseDto.locationId);
        if (!location) {
            throw new AppError(
                'Location not found, is not possible to register this purchase',
                400
            );
        }
        const fruit = await this.fruitsService.getFruitById(createPurchaseDto.fruitId);
        if (!fruit) {
            throw new AppError(
                'Fruit not found, is not possible to register this purchase',
                400
            );
        }
    }
}
