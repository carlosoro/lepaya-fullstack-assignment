import { Test, TestingModule } from '@nestjs/testing';
import { FruitsService } from './fruits.service';
import { FruitsRepository } from './fruits.repository';
import { FruityViceClient } from './clients/fruityvice.client';

describe('FruitsService', () => {
  let service: FruitsService;

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
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
