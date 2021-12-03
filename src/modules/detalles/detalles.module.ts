import { Module } from '@nestjs/common';
import { DetallesService } from './services/detalles.service';
import { DetallesController } from './controllers/detalles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallesRepository } from './repository/detalles.repository';
import { FacturasRepository } from '@modules/facturas/repository/facturas.repository';
import { ProductosRepository } from '@modules/productos/repository/productos.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DetallesRepository,
      FacturasRepository,
      ProductosRepository,
    ]),
  ],
  providers: [DetallesService],
  controllers: [DetallesController],
})
export class DetallesModule {}
