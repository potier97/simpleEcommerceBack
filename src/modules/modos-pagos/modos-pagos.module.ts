import { Module } from '@nestjs/common';
import { ModosPagosService } from './services/modos-pagos.service';
import { ModosPagosController } from './controllers/modos-pagos.controller';
import { modospagos } from './entities/modospagos.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { facturas } from '@modules/facturas/entities/facturas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([modospagos, facturas])],
  providers: [ModosPagosService],
  controllers: [ModosPagosController],
})
export class ModosPagosModule {}
