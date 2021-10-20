import { Test, TestingModule } from '@nestjs/testing';
import { ModosPagosService } from './modos-pagos.service';

describe('ModosPagosService', () => {
  let service: ModosPagosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModosPagosService],
    }).compile();

    service = module.get<ModosPagosService>(ModosPagosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
