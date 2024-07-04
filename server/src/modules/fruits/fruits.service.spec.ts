import { Test, TestingModule } from '@nestjs/testing';
import { FruitsService } from './fruits.service';
import { FruitsRepository } from './fruits.repository';
import { FruityViceClient } from './clients/fruityvice.client';

describe('FruitsService', () => {
  let service: FruitsService;
  let fruitsRepository: FruitsRepository;
  let fruityViceClient: FruityViceClient;

  const defaultFruityClientResponse = [
    {
      name: 'Lime',
      id: 44,
      family: 'Rutaceae',
      order: 'Sapindales',
      genus: 'Citrus',
      nutritions: {
        calories: 25,
        fat: 0.1,
        sugar: 1.7,
        carbohydrates: 8.4,
        protein: 0.3
      }
    }
  ]

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FruitsService,
        {
          provide: FruitsRepository,
          useValue: {
            findByIds: jest.fn()
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
      fruitsRepository.findByIds = jest.fn().mockResolvedValue(null);
      const fruits = [
        { fruitId: 10, amount: 10 }
      ];
      expect(async () => {
        await service.getFruitsNutritionalValue(fruits);
      }).rejects.toThrow('Fruits data not found');
    });

    it('should return an empty array when no stats are found', () => {
      fruitsRepository.findByIds = jest.fn().mockResolvedValue([
        { fruityvice_id: 1, id: 1, name: 'Lime' }
      ]);
      fruityViceClient.getAll = jest.fn().mockResolvedValue([]);
      const fruits = [
        { fruitId: 1, amount: 10 }
      ];
      expect(service.getFruitsNutritionalValue(fruits))
        .resolves
        .toEqual([]);
    });
    it('should return the nutricional information when found', () => {
      fruitsRepository.findByIds = jest.fn().mockResolvedValue([
        {
          fruityvice_id: 44,
          id: 1,
          name: 'Lime'
        }
      ]);
      const expected = [{
        id: 1,
        fruityvice_id: 44,
        name: 'Lime',
        calories: 25,
        fat: 0.1,
        sugar: 1.7,
        carbohydrates: 8.4,
        protein: 0.3
      }];
      const fruits = [
        { fruitId: 1, amount: 10 }
      ];
      fruityViceClient.getAll = jest.fn().mockResolvedValue(defaultFruityClientResponse);
      expect(service.getFruitsNutritionalValue(fruits))
        .resolves
        .toEqual(expected);
    })
  });
});
