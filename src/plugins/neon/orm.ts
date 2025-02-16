import { FastifyPluginAsync } from 'fastify';
import { DataSource, DataSourceOptions } from 'typeorm';
import fp from 'fastify-plugin';
import 'dotenv/config';

const entities = [`${__dirname}/entities/*.ts`, `${__dirname}/entities/*.js`];

// Define default connection options
const defaultOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.NEON_DATABASE_URL as string,
  ssl: true,
  synchronize: true, // Only for development; disable in production.
  logging: false,
  entities: entities,
};

export const neonDataSource = new DataSource(defaultOptions);

const ormPlugin: FastifyPluginAsync = async (fastify) => {
  await neonDataSource.initialize();
  fastify.decorate('typeorm', neonDataSource);
};

export default fp(ormPlugin, {
  name: 'fastify-typeorm',
});
