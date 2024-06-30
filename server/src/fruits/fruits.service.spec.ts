import { Test, TestingModule } from '@nestjs/testing';
import { FruitsService } from './fruits.service';
import { LedgersService } from './../ledgers/ledgers.service';
import { LocationsService } from './../locations/locations.service';

describe('FruitsService', () => {
  let service: FruitsService;
  let ledgersService: LedgersService;
  let locationsService: LocationsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FruitsService,
        {
          provide: LedgersService,
          useValue: {
            getConsumptions: jest.fn()
          }
        },
        {
          provide: LocationsService,
          useValue: {
            getLocationById: jest.fn()
          }
        }
      ],
    }).compile();

    service = module.get<FruitsService>(FruitsService);
    ledgersService = module.get<LedgersService>(LedgersService);
    locationsService = module.get<LocationsService>(LocationsService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getFruitReports', () => {
    it('should return an a default response when no consumptions are found', async () => {
      ledgersService.getConsumptions = jest.fn().mockResolvedValue([]);
      const expectedResponse = {
        mostConsumedFruit: null,
        averageFruitConsumption: 0
      };
      const getReportDto = { year: 2021, locationId: 1 };
      const result = await service.getFruitReports(getReportDto);
      expect(result).toEqual(expectedResponse);
    });

    it('should return the most consumed fruit and the average consumption', async () => {
      ledgersService.getConsumptions = jest.fn().mockResolvedValue([
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
      const result = await service.getFruitReports(getReportDto);
      expect(result).toEqual(expectedResponse);
    });

    it('should return averageFruitConsumption=0 if location is not retrieved', async () => {
      ledgersService.getConsumptions = jest.fn().mockResolvedValue([
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
      const result = await service.getFruitReports(getReportDto);
      expect(result).toEqual(expectedResponse);
    });
  });
});
