import { Type } from "class-transformer";
import { IsInt } from "class-validator";

export class CreatePurchaseDto {
    @IsInt()
    @Type(() => Number)
    fruitId: number;

    @IsInt()
    @Type(() => Number)
    locationId: number;

    @IsInt()
    @Type(() => Number)
    amount: number;
}