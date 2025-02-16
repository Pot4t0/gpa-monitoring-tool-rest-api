import fastify from 'fastify';
import routes from './routes';
import swagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import ormPlugin from './plugins/neon/orm';
import 'dotenv/config';

const app = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
    level: 'debug',
  },
  ajv: {
    customOptions: {
      strict: false,
    },
  },
});

// Register Swagger plugin
app.register(swagger, {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'GPA Monitoring Tool API',
      description: 'API documentation for the GPA Monitoring Tool',
      version: '1.0.0',
    },
  },
});
app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
});

// Register Neon ORM plugin
app.register(ormPlugin);

// Register routes
app.register(routes);

const host =
  process.env.HOST ||
  (process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost');

const start = async () => {
  try {
    await app.ready();
    app.swagger();
    await app.listen({ port: 3000, host: '0.0.0.0' });
    app.log.info(`Server listening on port 3000`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
