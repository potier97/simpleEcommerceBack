import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';

import { Environments } from './environment';
import envConfig from './env-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: Environments[process.env.NODE_ENV] || `.env`,
      load: [envConfig],
      isGlobal: true,
      expandVariables: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        //Conexión a postgress
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_HOST: Joi.string().required(),
      }),
    }),
  ],
  exports: [ConfigModule],
})
export class ConfigurationsModule {}
