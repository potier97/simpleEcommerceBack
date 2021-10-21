import { Module } from '@nestjs/common';
import { ClientesService } from './services/clientes.service';
import { ClientesController } from './controllers/clientes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { clientes } from './entities/clientes.entity';
import { facturas } from '@modules/facturas/entities/facturas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([clientes, facturas])],
  providers: [ClientesService],
  controllers: [ClientesController],
})
export class ClientesModule {}
