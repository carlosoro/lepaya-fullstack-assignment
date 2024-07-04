import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePurchaseDto } from './dtos/createPurchase.dto';
import { LedgersService } from './ledgers.service';
import { GetReportDto } from './dtos/getReport.dto';
import { InsertedPurchase, Report } from './types';

@Controller('ledgers')
export class LedgersController {

    constructor(
        private readonly ledgersService: LedgersService
    ) { }

    @Get('reports')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getFruitReports(@Query() getReportDto: GetReportDto): Promise<Report | HttpException> {
        try {
            return await this.ledgersService.getConsumptionReports(getReportDto);
        } catch (error) {
            throw new HttpException(
                'An error occurred while getting the report',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    @Post('purchases')
    async createPurchase(@Body(ValidationPipe) createPurchaseDto: CreatePurchaseDto): Promise<InsertedPurchase | HttpException>{
        try {
            return await this.ledgersService.createPurchase(createPurchaseDto);
        } catch (error) {
            throw new HttpException(
                'An error occurred while creating the purchase',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }
}
