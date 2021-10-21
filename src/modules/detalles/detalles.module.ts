import { Module } from '@nestjs/common';
import { DetallesService } from './services/detalles.service';
import { DetallesController } from './controllers/detalles.controller';
import { detalles } from './entities/detalles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { facturas } from '@modules/facturas/entities/facturas.entity';
import { productos } from '@modules/productos/entities/productos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([detalles, facturas, productos])],
  providers: [DetallesService],
  controllers: [DetallesController],
})
export class DetallesModule {}
