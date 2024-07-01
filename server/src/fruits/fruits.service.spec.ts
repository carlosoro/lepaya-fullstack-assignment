import { Test, TestingModule } from '@nestjs/testing';
import { FruitsService } from './fruits.service';
import { FruitsRepository } from './fruits.repository';
import { FruityViceClient } from './clients/fruityvice.client';

describe('FruitsService', () => {
  let service: FruitsService;
  let fruitsRepository: FruitsRepository;
  let fruityViceClient: FruityViceClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FruitsService,
        {
          provide: FruitsRepository,
          useValue: {
            getById: jest.fn()
          }
        },
        {
          provide: FruityViceClient,
          useValue: {
            getFruitStats: jest.fn()
          }
        },
      ],
    }).compile();

    service = module.get<FruitsService>(FruitsService);
    fruitsRepository = module.get<FruitsRepository>(FruitsRepository);
    fruityViceClient = module.get<FruityViceClient>(FruityViceClient);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getFruitNutritionalValue', () => {
    it('should return an error when no fruit is found', async () => {
      fruitsRepository.getById = jest.fn().mockResolvedValue(null);
      const fruitNumber = 10;
      expect(async () => {
        await service.getFruitNutritionalValue(fruitNumber);
      }).rejects.toThrow('Fruit not found');
    });
    it('should return the default object when no stats are found', () => {
      fruitsRepository.getById = jest.fn().mockResolvedValue({ fruityvice_id: 1 });
      fruityViceClient.getById = jest.fn().mockResolvedValue(null);
      const expectedObject = {
        calories: 0,
        carbohydrates: 0,
        fat: 0,
        protein: 0,
        sugar: 0,
      };
      expect(service.getFruitNutritionalValue(1))
        .resolves
        .toEqual(expectedObject);
    });
    it('should return the nutricional information when found', () => {
      fruitsRepository.getById = jest.fn().mockResolvedValue({ fruityvice_id: 1 });
      const expectedObject = {
        calories: 10,
        carbohydrates: 0,
        fat: 0,
        protein: 0,
        sugar: 0,
      };
      fruityViceClient.getById = jest.fn().mockResolvedValue({
        nutritions: expectedObject
      });
      expect(service.getFruitNutritionalValue(1))
        .resolves
        .toEqual(expectedObject);
    })
  });
});
