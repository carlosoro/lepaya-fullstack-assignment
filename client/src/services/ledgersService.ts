import { getFruitReport, createFruitPurchase } from '../clients/ledgersAPI';
import { FruitCreationResponse, FruitReportResponse, Purchase } from '../types';

export const getReport = async (locationId: number, year: number): Promise<FruitReportResponse> => {
    if (!locationId || !year) {
        throw new Error('Invalid input provided');
    }
    return await getFruitReport(locationId, year);
}

export const createPurchase = async ({ locationId, fruitId, amount }: Purchase): Promise<FruitCreationResponse> => {
    if (!locationId || !fruitId || !amount) {
        throw new Error('Invalid input provided');
    }
    return createFruitPurchase({ locationId, fruitId, amount });
}