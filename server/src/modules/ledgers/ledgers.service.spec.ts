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

  const defaultConsumptions = [
    { fruit_id: 1, location_id: 1, amount: -100, fruit: { name: 'Apple' }, time: '2021-07-06 22:50:52.557 +0200' },
    { fruit_id: 1, location_id: 1, amount: -90, fruit: { name: 'Apple' }, time: '2021-07-07 22:50:52.557 +0200' },
    { fruit_id: 2, location_id: 1, amount: -10, fruit: { name: 'Banana' }, time: '2021-07-08 22:50:52.557 +0200' },
  ];

  const defaultPurchaseInput = {
    locationId: 1,
    fruits: [{ fruitId: 1, amount: 10 }]
  };

  const defaultFruitStats = [
    {
      id: 1,
      fruityvice_id: 44,
      name: 'Lime',
      calories: 25,
      fat: 0.1,
      sugar: 1.7,
      carbohydrates: 8.4,
      protein: 0.3
    }
  ];

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LedgersService,
        {
          provide: LocationsService,
          useValue: {
            getLocationById: jest.fn(),
          }
        },
        {
          provide: LedgersRepository,
          useValue: {
            getConsumptions: jest.fn(),
            bulkCreate: jest.fn()
          }
        },
        {
          provide: FruitsService,
          useValue: {
            getFruitNutritionalValue: jest.fn(),
            getFruitById: jest.fn()
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
      locationsService.getLocationById = jest.fn().mockResolvedValue({ id: 1, name: 'Amsterdam' });
      const expectedResponse = {
        mostConsumedFruit: null,
        averageFruitConsumption: 0
      };
      const getReportDto = { year: 2021, locationId: 1 };
      const result = await service.getConsumptionReports(getReportDto);
      expect(result).toEqual(expectedResponse);
    });

    it('should return the most consumed fruit and the average consumption', async () => {
      ledgersRepository.getConsumptions = jest.fn().mockResolvedValue(defaultConsumptions);
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

    it('should return error if location is not found', async () => {
      ledgersRepository.getConsumptions = jest.fn().mockResolvedValue(defaultConsumptions);
      locationsService.getLocationById = jest.fn().mockResolvedValue(null);
      const expectedResponse = {
        mostConsumedFruit: { fruitId: 1, amount: 190, name: 'Apple' },
        averageFruitConsumption: 0
      };
      const getReportDto = { year: 2021, locationId: 1 };
      await expect(service.getConsumptionReports(getReportDto)).rejects.toThrow('Location not found, is not possible to process request');
    });
  });

  describe('createPurchase', () => {
    it('should throw error when total fruit calories exceed 1000 kcal', async () => {
      locationsService.getLocationById = jest.fn().mockResolvedValue({ id: 1, name: 'Amsterdam' });
      fruitsService.getFruitsNutritionalValue = jest.fn().mockResolvedValue([
        {
          id: 1,
          fruityvice_id: 44,
          name: 'Lime',
          calories: 1001,
          fat: 0.1,
          sugar: 1.7,
          carbohydrates: 8.4,
          protein: 0.3
        }
      ]);

      await expect(
        service.createPurchase(defaultPurchaseInput)
      ).rejects
        .toThrow('Calories limit exceeded, is not possible to register this purchase');
    });

    it('should throw an error if an error occurs during purchase creation', async () => {
      locationsService.getLocationById = jest.fn().mockResolvedValue({ id: 1, name: 'Amsterdam' });
      ledgersRepository.bulkCreate = jest.fn().mockRejectedValue(new Error('Error message'));
      fruitsService.getFruitsNutritionalValue = jest.fn().mockResolvedValue(defaultFruitStats);

        await expect(
          service.createPurchase(defaultPurchaseInput)
      ).rejects.toThrow(
        'Error message'
      );
    });
  });
});