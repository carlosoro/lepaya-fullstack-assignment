import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { FruitsService } from './fruits.service';
import { GetReportDto } from './dtos/getReport.dto';

@Controller('fruits')
export class FruitsController {

    constructor(private readonly fruitsService: FruitsService) { }

    @Get('reports')
    @UsePipes(new ValidationPipe({ transform: true }))
    getFruitReports(@Query() getReportDto: GetReportDto) {
        const reports = this.fruitsService.getFruitReports(getReportDto);
        return reports;
    }
}
