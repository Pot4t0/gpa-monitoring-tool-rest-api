import fastify from 'fastify';
import routes from './routes';
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
});

// Register Neon ORM plugin
app.register(ormPlugin);

// Register routes
app.register(routes);

const start = async () => {
  try {
    await app.listen({ port: 3000 });
    app.log.info(`Server listening on port 3000`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
