import axios, { AxiosError } from 'axios';
import { FruitReportResponse, Purchase, PurchaseCreationResponse } from '../types';
import { ledgersAPIUrl } from '../config/app-environment';
import { requestErrorHandler } from '../utils/errorHandler';

export const getFruitReport = async (locationId: number, year: number): Promise<FruitReportResponse> => {
    try {
        const url = `${ledgersAPIUrl}/ledgers/reports`;
        const { data } = await axios.get(url, {
            params: {
                locationId,
                year
            }
        });
        return data;
    } catch (error) {
        throw requestErrorHandler(error as AxiosError);
    }
}

export const createFruitPurchase = async (purchase: Purchase): Promise<PurchaseCreationResponse> => {
    try {
        const url = `${ledgersAPIUrl}/ledgers/purchases`;
        const { data } = await axios.post(url, purchase);
        return data;
    } catch (error) {
        throw requestErrorHandler(error as AxiosError);
    }
}