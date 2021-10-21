import { Module } from '@nestjs/common';
import { ProductosModule } from '@modules/productos/productos.module';
import { DetallesModule } from '@modules/detalles/detalles.module';
import { FacturasModule } from '@modules/facturas/facturas.module';
import { ClientesModule } from '@modules/clientes/clientes.module';
import { ModosPagosModule } from '@modules/modos-pagos/modos-pagos.module';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [
    DatabaseModule,
    ProductosModule,
    DetallesModule,
    FacturasModule,
    ClientesModule,
    ModosPagosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
