import fastify from 'fastify';
import routes from './routes';
import swagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import ormPlugin from './plugins/neon/orm';
import 'dotenv/config';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { IncomingMessage, ServerResponse } from 'http';

const app = fastify({
  logger: {
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

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    await app.ready();
    app.swagger();
    // Forward the request to the Fastify instance
    app.server.emit('request', req as IncomingMessage, res as ServerResponse);
  } catch (error) {
    console.error('Error handling request:', error);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
};
