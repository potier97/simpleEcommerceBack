import { Test, TestingModule } from '@nestjs/testing';
import { DetallesService } from './detalles.service';

describe('DetallesService', () => {
  let service: DetallesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetallesService],
    }).compile();

    service = module.get<DetallesService>(DetallesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
