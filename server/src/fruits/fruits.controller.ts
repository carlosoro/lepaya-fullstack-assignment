import { Controller, Get, HttpException, HttpStatus, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { FruitsService } from './fruits.service';
import { GetReportDto } from './dtos/getReport.dto';
import { FruitReport } from './types';

@Controller('fruits')
export class FruitsController {

    constructor(private readonly fruitsService: FruitsService) { }

    @Get('reports')
    @UsePipes(new ValidationPipe({ transform: true }))
    getFruitReports(@Query() getReportDto: GetReportDto): Promise<FruitReport> | HttpException {
        try {
            return this.fruitsService.getFruitReports(getReportDto);
        } catch (error) {
            throw new HttpException(
                'An error occurred while getting the report',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }
}
