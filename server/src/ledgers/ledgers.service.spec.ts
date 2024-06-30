import { Test, TestingModule } from '@nestjs/testing';
import { LedgersService } from './ledgers.service';
import { LedgersRepository } from './ledgers.repository';

describe('LedgersService', () => {
  let service: LedgersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LedgersService,
        {
          provide: LedgersRepository,
          useValue: {
            getConsumptions: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LedgersService>(LedgersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
