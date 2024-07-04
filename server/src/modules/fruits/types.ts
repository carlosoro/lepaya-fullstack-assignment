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
    nutritions: FruitStatsNutritions
}

export type FruitStatsNutritions = Omit<FruitNutricionalInfo, 'id' | 'fruityvice_id' | 'name'>

export type FruitNutricionalInfo = {
    id: number,
    fruityvice_id: number,
    name: string,
    calories: number,
    fat: number,
    sugar: number,
    carbohydrates: number,
    protein: number
}

export interface FruitPurchaseRequest {
    fruitId: number,
    amount: number
}