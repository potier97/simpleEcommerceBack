import { Module } from '@nestjs/common';
import { DetallesService } from './services/detalles.service';
import { DetallesController } from './controllers/detalles.controller';

@Module({
  providers: [DetallesService],
  controllers: [DetallesController]
})
export class DetallesModule {}
