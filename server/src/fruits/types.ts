export type FruitConsumption = {
    fruitId: number,
    amount: number,
    name: string,
}

export type FruitReport = {
    mostConsumedFruit: FruitConsumption,
    averageFruitConsumption: number,
}