import { Global, Module } from '@nestjs/common';
// import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import envConfig from '@configdata/env-config';
// console.log(process.env.NODE_ENV);
@Global()
@Module({
  imports: [
    // TypeOrmModule.forRootAsync({
    //   inject: [envConfig.KEY],
    //   useFactory: (configService: ConfigType<typeof envConfig>) => {
    //     const { dbName, host, password, port, user, schema } =
    //       configService.postgres;
    //     return {
    //       type: 'postgres',
    //       host: host,
    //       port: port,
    //       // ssl: process.env.NODE_ENV === 'dev' ? false : true,
    //       username: user,
    //       password: password,
    //       database: dbName,
    //       schema: schema,
    //       //entities: ['dist/**/*.entity{.ts,.js}'],
    //       synchronize: false,
    //       autoLoadEntities: true,
    //       retryDelay: 3000,
    //       retryAttempts: 10,
    //     };
    //   },
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ec2-52-204-213-254.compute-1.amazonaws.com',
      port: 5432,
      username: 'zmxztaetzvjaww',
      password:
        '3cd685f85c1b55523dcbce59734f52070ed9b70e45363e9a2b7d64f3cd861d8e',
      database: 'd2plf4o0fh5p0l',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
      retryDelay: 3000,
      retryAttempts: 10,
      autoLoadEntities: true,
      ssl: true,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
