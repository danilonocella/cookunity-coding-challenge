import { Test, TestingModule } from '@nestjs/testing';
import { WeaknessesService } from './weaknesses.service';

describe('WeaknessesService', () => {
  let service: WeaknessesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeaknessesService],
    }).compile();

    service = module.get<WeaknessesService>(WeaknessesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
