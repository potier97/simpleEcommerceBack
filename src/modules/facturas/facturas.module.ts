import { Module } from '@nestjs/common';
import { FacturasService } from './services/facturas.service';
import { FacturasController } from './controllers/facturas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacturasRepository } from './repository/facturas.repository';
import { ClientesRepository } from '@modules/clientes/repository/clientes.repository';
import { ModosPagosRepository } from '@modules/modos-pagos/repository/modos-pagos.repository';
import { DetallesRepository } from '@modules/detalles/repository/detalles.repository';
import { ProductosRepository } from '@modules/productos/repository/productos.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FacturasRepository,
      ClientesRepository,
      ModosPagosRepository,
      DetallesRepository,
      ProductosRepository,
    ]),
  ],
  providers: [FacturasService],
  controllers: [FacturasController],
})
export class FacturasModule {}
