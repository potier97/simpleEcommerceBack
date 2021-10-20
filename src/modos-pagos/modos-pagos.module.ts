import { Module } from '@nestjs/common';
import { ModosPagosService } from './services/modos-pagos.service';
import { ModosPagosController } from './controllers/modos-pagos.controller';

@Module({
  providers: [ModosPagosService],
  controllers: [ModosPagosController]
})
export class ModosPagosModule {}
