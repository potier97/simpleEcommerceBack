import { Module } from '@nestjs/common';
import { ProductosService } from './services/productos.service';
import { ProductosController } from './controllers/productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosRepository } from './repository/productos.repository';
import { DetallesRepository } from '@modules/detalles/repository/detalles.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductosRepository, DetallesRepository]),
  ],
  providers: [ProductosService],
  controllers: [ProductosController],
})
export class ProductosModule {}
