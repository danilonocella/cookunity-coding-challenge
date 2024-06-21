import { Test, TestingModule } from '@nestjs/testing';
import { WeaknessesController } from './weaknesses.controller';

describe('WeaknessesController', () => {
  let controller: WeaknessesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeaknessesController],
    }).compile();

    controller = module.get<WeaknessesController>(WeaknessesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
