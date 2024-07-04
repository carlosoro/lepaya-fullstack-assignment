import { Test, TestingModule } from '@nestjs/testing';
import { LocationsService } from './locations.service';
import { LocationsRepository } from './locations.repository';

describe('LocationsService', () => {
  let service: LocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationsService,
        {
          provide: LocationsRepository,
          useValue: {
            getLocationById: jest.fn(),
          },
        }
      ],

    }).compile();

    service = module.get<LocationsService>(LocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
