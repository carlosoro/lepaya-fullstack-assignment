import { Test, TestingModule } from '@nestjs/testing';
import { LedgersController } from './ledgers.controller';
import { LedgersService } from './ledgers.service';
import { LocationsService } from '../locations/locations.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('LedgersController', () => {
  let controller: LedgersController;
  let ledgersService: LedgersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LedgersController],
      providers: [
        LedgersService,
        {
          provide: LedgersService,
          useValue: {
            getConsumptionReports: jest.fn()
          }
        },
        {
          provide: LocationsService,
          useValue: {
            getLocationById: jest.fn()
          }
        }
      ]
    }).compile();

    controller = module.get<LedgersController>(LedgersController);
    ledgersService = module.get<LedgersService>(LedgersService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getFruitReports', () => {
    it('should throw an http exception error when an error occurs while getting the report', async () => {
      const getReportDto = { year: 2021, locationId: 1 };
      ledgersService.getConsumptionReports = jest.fn().mockRejectedValue(new Error('Internal server error'));
      expect(async () => {
        await controller.getFruitReports(getReportDto)
      }).rejects.toThrow(
        new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });

    it('should return valid object', async () => {
      const getReportDto = { year: 2024, locationId: 1 };
      const expectedResponse = {
        mostConsumedFruit: {
          fruitId: 1,
          amount: 100,
          name: 'Apple',
        },
        averageFruitConsumption: 10,
      };
      ledgersService.getConsumptionReports = jest.fn().mockResolvedValue(expectedResponse);
      const response = controller.getFruitReports(getReportDto)
      expect(response).resolves.toEqual(expectedResponse);
    });
  });

  describe('createPurchase', () => {
    it('should throw http error when an error is throw while creating the purchase', async () => {
      ledgersService.createPurchase = jest.fn().mockRejectedValue(new Error('Error message'));
      const createPurchaseDto = {
        locationId: 1,
        fruits: [{
          fruitId: 1,
          amount: 10
        }]
      };
      expect(async () => {
        await controller.createPurchase(createPurchaseDto)
      }).rejects.toThrow(
        new HttpException(
          'Error message',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });
});