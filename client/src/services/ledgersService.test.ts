import { describe, expect, it } from '@jest/globals';
import { getReport, createPurchase } from './ledgersService';

jest.mock('../config/app-environment', () => ({
    VITE_LEDGER_API_URL: 'localhost:3000',
}));

//Import dependencies to mock
import * as LedgersAPI from '../clients/ledgersAPI';

describe('ledgersService', () => {
    let mockGetFruitReport: jest.SpyInstance;
    let mockCreateFruitPurchase: jest.SpyInstance;

    const validReportResponse = {
        mostConsumedFruit: {
            fruitId: 5,
            amount: 8,
            name: "Plum"
        },
        averageFruitConsumption: 0.085
    }

    const validFruitCreationResponse = { id: 1 };

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getReport', () => {
        it('should throw an error if locationId is zero', async () => {
            const locationId = 0;
            const year = 2021;
            await expect(
                getReport(locationId, year)
            ).rejects
                .toThrow('Invalid input provided');
        });
        it('should throw an error if year is zero', async () => {
            const locationId = 1;
            const year = 0;
            await expect(
                getReport(locationId, year)
            ).rejects
                .toThrow('Invalid input provided');
        });
        it('should return a report when valid input is provided', () => {
            mockGetFruitReport = jest.spyOn(LedgersAPI, 'getFruitReport')
                .mockResolvedValue(validReportResponse);
            const locationId = 1;
            const year = 2024
            expect(getReport(locationId, year))
                .resolves
                .toEqual(validReportResponse);
        });
    });
    describe('createPurchase', () => {
        it('should throw an error if locationId is zero', async () => {
            const purchase = {
                locationId: 0,
                fruits: [
                    { fruitId: 1, amount: 10 }
                ]
            }
            await expect(
                createPurchase(purchase)
            ).rejects
                .toThrow('Invalid input provided');
        });
        it('should throw an error if fruits array is empty', async () => {
            const purchase = {
                locationId: 1,
                fruits: []
            }
            await expect(
                createPurchase(purchase)
            ).rejects
                .toThrow('Invalid input provided');
        });
        it('should return a report when valid input is provided', () => {
            mockCreateFruitPurchase = jest.spyOn(LedgersAPI, 'createFruitPurchase')
                .mockResolvedValue(validFruitCreationResponse);
                const purchase = {
                    locationId: 1,
                    fruits: [
                        { fruitId: 1, amount: 10 }
                    ]
                }
            expect(createPurchase(purchase))
                .resolves
                .toEqual(validFruitCreationResponse);
        });
    });
});