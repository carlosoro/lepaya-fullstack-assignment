import { FruityViceClient } from "./fruityvice.client";

describe('FruityViceClient', () => {
    let client: FruityViceClient;
    let httpService: any;
    let configService: any;

    beforeAll(() => {
        httpService = {
            axiosRef: {
                get: jest.fn()
            }
        };
        configService = {
            get: jest.fn().mockReturnValue('http://localhost')
        };
        client = new FruityViceClient(configService, httpService);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getById', () => {
        it('should return the fruit stats', async () => {
            const expectedObject = {
                "name": "Lime",
                "id": 44,
                "family": "Rutaceae",
                "order": "Sapindales",
                "genus": "Citrus",
                "nutritions": {
                    "calories": 25,
                    "fat": 0.1,
                    "sugar": 1.7,
                    "carbohydrates": 8.4,
                    "protein": 0.3
                }
            };
            httpService.axiosRef.get.mockResolvedValue({
                data: expectedObject
            });
            const response = client.getById(44);
            expect(response).resolves.toEqual(expectedObject);
        });
        it('should return null when an error is thrown', async () => {
            httpService.axiosRef.get.mockRejectedValue(new Error('Error'));
            const response = client.getById(44);
            expect(response).resolves.toBeNull();
        });
    });
});