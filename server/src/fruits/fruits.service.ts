import { Injectable } from '@nestjs/common';
import { GetReportDto } from './dtos/getReport.dto';
import { LedgersService } from 'src/ledgers/ledgers.service';
import { Ledger } from 'src/ledgers/entities/ledger.entity';
import { get } from 'http';

type MostConsumedFruit = {
    fruitId: number,
    amount: number,
}

@Injectable()
export class FruitsService {
    constructor(
        private readonly ledgersService: LedgersService,
    ) { }

    async getFruitReports(getReportDto: GetReportDto) {
        const consumptions = await this.ledgersService.getConsumptions({
            year: getReportDto.year,
            locationId: getReportDto.locationId
        });
        const mostConsumedFruit = this.getMostConsumedFruit(consumptions);
        return mostConsumedFruit;
    }

    private getMostConsumedFruit(consumedFruits: Ledger[]): MostConsumedFruit | null {
        const consumptionByFruit = [];
        if (!consumedFruits.length) {
            return null;
        }
        consumedFruits.forEach(consumedFruit => {
            const index = consumptionByFruit.findIndex(fruit => fruit.fruitId === consumedFruit.fruit_id);
            if (index === -1) {
                consumptionByFruit.push({
                    fruitId: consumedFruit.fruit_id,
                    amount: Math.abs(consumedFruit.amount),
                });
            } else {
                consumptionByFruit[index].amount += Math.abs(consumedFruit.amount);
            }
        });
        consumptionByFruit.sort((a, b) => b.amount - a.amount);
        return consumptionByFruit[0];
    }
}
