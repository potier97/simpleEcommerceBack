import { Test, TestingModule } from '@nestjs/testing';
import { DetallesController } from './detalles.controller';

describe('DetallesController', () => {
  let controller: DetallesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetallesController],
    }).compile();

    controller = module.get<DetallesController>(DetallesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
