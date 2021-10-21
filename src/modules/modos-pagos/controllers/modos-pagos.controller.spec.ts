import { Test, TestingModule } from '@nestjs/testing';
import { ModosPagosController } from './modos-pagos.controller';

describe('ModosPagosController', () => {
  let controller: ModosPagosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModosPagosController],
    }).compile();

    controller = module.get<ModosPagosController>(ModosPagosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
