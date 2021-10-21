import { Module } from '@nestjs/common';
import { ConfigurationsModule } from '@configdata/configurationsModule.module';
import { Configuration } from '@configdata/config.keys';
import { ProductosModule } from '@modules/productos/productos.module';
import { DetallesModule } from '@modules/detalles/detalles.module';
import { FacturasModule } from '@modules/facturas/facturas.module';
import { ClientesModule } from '@modules/clientes/clientes.module';
import { ModosPagosModule } from '@modules/modos-pagos/modos-pagos.module';
import { DatabaseModule } from '@database/database.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigurationsModule,
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
export class AppModule {
  static port: number;
  constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get<number>(Configuration.PORT);
  }
}
