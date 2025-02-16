import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import studentInfoRoute from './studentInfoRoute';
import updateStudentTeacherRoute from './updateStudentTeacherRoute';

export default async function routes(fastify: FastifyInstance) {
  fastify.get(
    '/',
    {
      schema: {
        description: 'Check API status',
        summary:
          'Returns a message indicating that the GPA Monitoring Tool API is working',
        response: {
          200: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'GPA Monitoring Tool API is working!',
              },
            },
          },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return { message: 'GPA Monitoring Tool API is working!' };
    }
  );

  // Register student info route
  fastify.register(studentInfoRoute, {
    prefix: '/students',
  });

  // Register student update route
  fastify.register(updateStudentTeacherRoute);
}
