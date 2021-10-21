import { Module } from '@nestjs/common';
import { FacturasService } from './services/facturas.service';
import { FacturasController } from './controllers/facturas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { facturas } from './entities/facturas.entity';
import { clientes } from '@modules/clientes/entities/clientes.entity';
import { modospagos } from '@modules/modos-pagos/entities/modospagos.entity';
import { detalles } from '@modules/detalles/entities/detalles.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([facturas, clientes, modospagos, detalles]),
  ],
  providers: [FacturasService],
  controllers: [FacturasController],
})
export class FacturasModule {}
