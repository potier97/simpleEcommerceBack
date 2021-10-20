import { Module } from '@nestjs/common';
import { ProductosService } from './services/productos.service';
import { ProductosController } from './controllers/productos.controller';

@Module({
  providers: [ProductosService],
  controllers: [ProductosController]
})
export class ProductosModule {}
