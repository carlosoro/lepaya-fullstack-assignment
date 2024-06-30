import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class GetReportDto {

    @IsInt()
    @Type(() => Number)
    location_id: number;

    @IsInt()
    @Type(() => Number)
    year: number;

}
