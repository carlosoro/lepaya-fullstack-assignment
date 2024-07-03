export interface Purchase {
    locationId: number;
    fruitId: number;
    amount: number;
}

export interface PurchaseCreationResponse {
    id: number;
}

export interface FruitReportResponse {
    mostConsumedFruit: MostConsumedFruit;
    averageFruitConsumption: number;
}

export interface MostConsumedFruit {
    fruitId: string;
    amount: number;
    name: string;
}

export interface FruitCreationResponse {
    id: number
}