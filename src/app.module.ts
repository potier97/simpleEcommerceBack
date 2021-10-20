import { Module } from '@nestjs/common';
import { ProductosModule } from './productos/productos.module';
import { DetallesModule } from './detalles/detalles.module';
import { FacturasModule } from './facturas/facturas.module';
import { ClientesModule } from './clientes/clientes.module';
import { ModosPagosModule } from './modos-pagos/modos-pagos.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ec2-52-204-213-254.compute-1.amazonaws.com',
      port: 5432,
      username: 'zmxztaetzvjaww',
      password: '3cd685f85c1b55523dcbce59734f52070ed9b70e45363e9a2b7d64f3cd861d8e',
      database: 'd2plf4o0fh5p0l',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: false,
      retryDelay: 3000,
      retryAttempts: 10,
      autoLoadEntities: true,
      ssl: true
      ,}),
      ProductosModule, DetallesModule, FacturasModule, ClientesModule, ModosPagosModule,
  ],
  controllers: [],
  providers: [],
  
})
export class AppModule {}
