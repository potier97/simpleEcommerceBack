import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import envConfig from '@configdata/env-config';
console.log(process.env.NODE_ENV);

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [envConfig.KEY],
      useFactory: (configService: ConfigType<typeof envConfig>) => {
        const { dbName, host, password, port, user } = configService.postgres;
        return {
          type: 'postgres',
          host: host,
          port: port,
          username: user,
          password: password,
          database: dbName,
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: true,
          retryDelay: 3000,
          retryAttempts: 10,
          autoLoadEntities: true,
          ssl: true,
          extra: {
            ssl: {
              rejectUnauthorized: false,
            },
          },
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
