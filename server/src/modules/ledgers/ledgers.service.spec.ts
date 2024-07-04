import { Test, TestingModule } from '@nestjs/testing';
import { LedgersService } from './ledgers.service';
import { LocationsService } from '../locations/locations.service';
import { LedgersRepository } from './ledgers.repository';
import { FruitsService } from './../fruits/fruits.service';

describe('LedgersService', () => {
  let service: LedgersService;
  let ledgersRepository: LedgersRepository;
  let locationsService: LocationsService
  let fruitsService: FruitsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LedgersService,
        {
          provide: LocationsService,
          useValue: {
            getLocationById: jest.fn()
          }
        },
        {
          provide: LedgersRepository,
          useValue: {
            getConsumptions: jest.fn()
          }
        },
        {
          provide: FruitsService,
          useValue: {
            getFruitNutritionalValue: jest.fn()
          }
        },
      ],
    }).compile();

    service = module.get<LedgersService>(LedgersService);
    ledgersRepository = module.get<LedgersRepository>(LedgersRepository);
    locationsService = module.get<LocationsService>(LocationsService);
    fruitsService = module.get<FruitsService>(FruitsService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getConsumptionReports', () => {
    it('should return an a default response when no consumptions are found', async () => {
      ledgersRepository.getConsumptions = jest.fn().mockResolvedValue([]);
      const expectedResponse = {
        mostConsumedFruit: null,
        averageFruitConsumption: 0
      };
      const getReportDto = { year: 2021, locationId: 1 };
      const result = await service.getConsumptionReports(getReportDto);
      expect(result).toEqual(expectedResponse);
    });

    it('should return the most consumed fruit and the average consumption', async () => {
      ledgersRepository.getConsumptions = jest.fn().mockResolvedValue([
        { fruit_id: 1, location_id: 1, amount: -100, fruit: { name: 'Apple' }, time: '2021-07-06 22:50:52.557 +0200' },
        { fruit_id: 1, location_id: 1, amount: -90, fruit: { name: 'Apple' }, time: '2021-07-07 22:50:52.557 +0200' },
        { fruit_id: 2, location_id: 1, amount: -10, fruit: { name: 'Banana' }, time: '2021-07-08 22:50:52.557 +0200' },
      ]);
      locationsService.getLocationById = jest.fn().mockResolvedValue(
        {
          id: 1,
          name: 'Amsterdam',
          headcount: 200
        }
      );
      const expectedResponse = {
        mostConsumedFruit: { fruitId: 1, amount: 190, name: 'Apple' },
        averageFruitConsumption: 1
      };
      const getReportDto = { year: 2021, locationId: 1 };
      const result = await service.getConsumptionReports(getReportDto);
      expect(result).toEqual(expectedResponse);
    });

    it('should return averageFruitConsumption=0 if location is not retrieved', async () => {
      ledgersRepository.getConsumptions = jest.fn().mockResolvedValue([
        { fruit_id: 1, location_id: 1, amount: -100, fruit: { name: 'Apple' }, time: '2021-07-06 22:50:52.557 +0200' },
        { fruit_id: 1, location_id: 1, amount: -90, fruit: { name: 'Apple' }, time: '2021-07-07 22:50:52.557 +0200' },
        { fruit_id: 2, location_id: 1, amount: -10, fruit: { name: 'Banana' }, time: '2021-07-08 22:50:52.557 +0200' },
      ]);
      locationsService.getLocationById = jest.fn().mockResolvedValue(null);
      const expectedResponse = {
        mostConsumedFruit: { fruitId: 1, amount: 190, name: 'Apple' },
        averageFruitConsumption: 0
      };
      const getReportDto = { year: 2021, locationId: 1 };
      const result = await service.getConsumptionReports(getReportDto);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('createPurchase', () => {
    it('should throw error when total fruit calories exceed 1000 kcal', async () => {
      fruitsService.getFruitNutritionalValue = jest.fn().mockResolvedValue({
        calories: 1000
      });
      const createPurchaseDto = { fruitId: 1, locationId: 1, amount: 2 };
      await expect(
        service.createPurchase(createPurchaseDto)
      ).rejects
        .toThrow('Calories limit exceeded, is not possible to register this purchase');
    });

    it('should throw an error if an error occurs during purchase creation', async () => {
      ledgersRepository.createPurchase = jest.fn().mockRejectedValue(new Error('Error message'));
      fruitsService.getFruitNutritionalValue = jest.fn().mockResolvedValue({
        calories: 10
      });
      const createPurchaseDto = { fruitId: 1, locationId: 1, amount: 2 };
      expect(async () => {
        await service.createPurchase(createPurchaseDto)
      }).rejects.toThrow(
        'Error message'
      );
    });
  });
});
