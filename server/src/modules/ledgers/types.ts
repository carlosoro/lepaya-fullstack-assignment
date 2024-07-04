export type ConsumptionFilters = {
    year: number,
    locationId: number,
};

export type Consumption = {
    fruitId: number,
    amount: number,
    name: string,
}

export type Report = {
    mostConsumedFruit: Consumption,
    averageFruitConsumption: number,
}

export type InsertedPurchase = {
    id: number
}