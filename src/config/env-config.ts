import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      port: process.env.PORT,
    },
    postgres: {
      dbName: process.env.POSTGRES_DB,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      password: process.env.POSTGRES_PASSWORD,
      schema: process.env.POSTGRES_SCHEMA,
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
    },
    amq: {
      url: process.env.AMQP_URL,
      queue: process.env.AMQP_QUEUE,
      name: process.env.AMQP_NAME,
    },
  };
});
