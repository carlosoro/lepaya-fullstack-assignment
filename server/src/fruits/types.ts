export type FruitConsumption = {
    fruitId: number,
    amount: number,
    name: string,
}

export type FruitReport = {
    mostConsumedFruit: FruitConsumption,
    averageFruitConsumption: number,
}

export type FruityViceResponse = {
    name: string,
    id: number,
    family: string,
    order: string,
    genus: string,
    nutritions: FruityViceNutricionalInfo
}

export type FruityViceNutricionalInfo = {
    calories: number,
    fat: number,
    sugar: number,
    carbohydrates: number,
    protein: number
}