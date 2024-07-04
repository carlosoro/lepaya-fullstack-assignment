import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class GetReportDto {

    @IsInt()
    @Type(() => Number)
    locationId: number;

    @IsInt()
    @Type(() => Number)
    year: number;

}
