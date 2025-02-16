import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import studentRoutes from './studentRoutes';

export default async function routes(fastify: FastifyInstance) {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    return { message: 'GPA Monitoring Tool API is working!' };
  });

  // Register student routes
  fastify.register(studentRoutes, { prefix: '/students' });
}
