import { Module } from '@nestjs/common';
import { ClientesService } from './services/clientes.service';
import { ClientesController } from './controllers/clientes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesRepository } from './repository/clientes.repository';
import { FacturasRepository } from '@modules/facturas/repository/facturas.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ClientesRepository, FacturasRepository])],
  providers: [ClientesService],
  controllers: [ClientesController],
})
export class ClientesModule {}
