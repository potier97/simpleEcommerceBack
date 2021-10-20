import { Module } from '@nestjs/common';
import { FacturasService } from './services/facturas.service';
import { FacturasController } from './controllers/facturas.controller';
import  {TypeOrmModule} from '@nestjs/typeorm';
import { facturas } from './entities/facturas.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([facturas])],
  providers: [FacturasService],
  controllers: [FacturasController]
})
export class FacturasModule {}
