import { Test, TestingModule } from '@nestjs/testing';
import { FruitsController } from './fruits.controller';
import { FruitsService } from './fruits.service';
import { LocationsService } from './../locations/locations.service';
import { LedgersService } from './../ledgers/ledgers.service';

describe('FruitsController', () => {
  let controller: FruitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FruitsController],
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
      ]
    }).compile();

    controller = module.get<FruitsController>(FruitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
