import { Test, TestingModule } from '@nestjs/testing';
import { LocationsService } from './locations.service';
import { LocationsRepository } from './locations.repository';

describe('LocationsService', () => {
  let service: LocationsService;
  let locationsRepository: LocationsRepository;

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
    locationsRepository = module.get<LocationsRepository>(LocationsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getLocationById', () => {
    it('should return a location', async () => {
      const LocationId = 1;
      const locationObject = {
        id: 1,
        name: 'Amsterdam',
      }
      locationsRepository.getById = jest.fn().mockResolvedValue(locationObject);
      const result = await service.getLocationById(LocationId);
      expect(result).toEqual(locationObject);
    });
  });
});
