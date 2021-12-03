import { Module } from '@nestjs/common';
import { ModosPagosService } from './services/modos-pagos.service';
import { ModosPagosController } from './controllers/modos-pagos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModosPagosRepository } from './repository/modos-pagos.repository';
import { FacturasRepository } from '@modules/facturas/repository/facturas.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ModosPagosRepository, FacturasRepository]),
  ],
  providers: [ModosPagosService],
  controllers: [ModosPagosController],
})
export class ModosPagosModule {}
