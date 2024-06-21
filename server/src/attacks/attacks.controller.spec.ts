import { Test, TestingModule } from '@nestjs/testing';
import { AttacksController } from './attacks.controller';

describe('AttacksController', () => {
  let controller: AttacksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttacksController],
    }).compile();

    controller = module.get<AttacksController>(AttacksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
