import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import studentInfoRoute from './studentInfoRoute';
import updateStudentTeacherRoute from './updateStudentTeacherROute';

export default async function routes(fastify: FastifyInstance) {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    return { message: 'GPA Monitoring Tool API is working!' };
  });

  // Register student info route
  fastify.register(studentInfoRoute);

  // Register student update route
  fastify.register(updateStudentTeacherRoute);
}
