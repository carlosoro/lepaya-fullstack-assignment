import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsInt, ValidateNested } from "class-validator";

class FruitPurchaseObj {
    @IsInt()
    @Type(() => Number)
    fruitId: number;

    @IsInt()
    @Type(() => Number)
    amount: number;
}

export class CreatePurchaseDto {
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    fruits: FruitPurchaseObj[];

    @IsInt()
    @Type(() => Number)
    locationId: number;
}