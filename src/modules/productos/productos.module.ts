import { Module } from '@nestjs/common';
import { ProductosService } from './services/productos.service';
import { ProductosController } from './controllers/productos.controller';
import { productos } from './entities/productos.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { detalles } from '@modules/detalles/entities/detalles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([productos, detalles])],
  providers: [ProductosService],
  controllers: [ProductosController],
})
export class ProductosModule {}
