import { Controller, Get } from '@nestjs/common';
import { FruitsService } from './fruits.service';

@Controller('fruits')
export class FruitsController {

    constructor(private readonly fruitsService: FruitsService) { }

    @Get('reports')
    getFruitReports() {
        const reports = this.fruitsService.getFruitReports();
    }
}
