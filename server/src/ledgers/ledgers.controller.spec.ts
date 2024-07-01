import { Test, TestingModule } from '@nestjs/testing';
import { LedgersController } from './ledgers.controller';
import { LedgersService } from './ledgers.service';
import { LocationsService } from './../locations/locations.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('LedgersController', () => {
  let controller: LedgersController;
  let ledgersService: LedgersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LedgersController],
      providers: [
        LedgersService,
        {
          provide: LedgersService,
          useValue: {
            getFruitReports: jest.fn()
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

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should throw an http exception error when an error occurs while getting the report', async () => {
    const getReportDto = { year: 2021, locationId: 1 };

    jest.spyOn(ledgersService, 'getFruitReports').mockImplementation(() => {
      throw Error('Internal server error');
    });

    expect(() => {
      controller.getFruitReports(getReportDto)
    }).toThrow(
      new HttpException(
        'An error occurred while getting the report',
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
    ledgersService.getFruitReports = jest.fn().mockResolvedValue(expectedResponse);
    const response = controller.getFruitReports(getReportDto)
    expect(response).resolves.toEqual(expectedResponse);
  });

});