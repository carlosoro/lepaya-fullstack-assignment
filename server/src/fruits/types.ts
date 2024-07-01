export type FruitConsumption = {
    fruitId: number,
    amount: number,
    name: string,
}

export type FruitReport = {
    mostConsumedFruit: FruitConsumption,
    averageFruitConsumption: number,
}

export type FruitStats = {
    name: string,
    id: number,
    family: string,
    order: string,
    genus: string,
    nutritions: FruitNutricionalInfo
}

export type FruitNutricionalInfo = {
    calories: number,
    fat: number,
    sugar: number,
    carbohydrates: number,
    protein: number
}