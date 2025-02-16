import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { Student } from '../plugins/neon/entities/Student';
import { Teacher } from '../plugins/neon/entities/Teacher';
import { neonDataSource } from '../plugins/neon/orm';

const studentRepo = neonDataSource.getRepository(Student);
const teacherRepo = neonDataSource.getRepository(Teacher);

export default async function updateStudentTeacherRoute(
  fastify: FastifyInstance
) {
  /*/
  QUESTION 3:
  Update your data to assign a student from one teacher to another.
  This reassignment should affect all past data.
  /*/
  fastify.put(
    '/student/teacher',
    {
      schema: {
        description:
          'Reassign a student to a new teacher. Both studentId and newTeacherId must be provided in the request body. The update affects all past data.',
        summary: 'Reassign a student to a new teacher',
        body: {
          type: 'object',
          properties: {
            studentId: { type: 'number', example: 1 },
            newTeacherId: { type: 'number', example: 2 },
          },
          required: ['studentId', 'newTeacherId'],
        },
        response: {
          200: {
            description: 'Student reassigned successfully',
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Student reassigned successfully',
              },
              student: {
                type: 'object',
                properties: {
                  studentId: { type: 'number', example: 1 },
                  studentName: { type: 'string', example: 'Student One' },
                },
                required: ['studentId'],
              },
              newTeacher: {
                type: 'object',
                properties: {
                  teacherId: { type: 'number', example: 2 },
                  teacherName: { type: 'string', example: 'Bob Smith' },
                },
                required: ['teacherId'],
              },
            },
          },
          400: {
            description: 'Bad Request. Missing required fields.',
            type: 'object',
            properties: {
              error: { type: 'string', example: 'newTeacherId is required' },
            },
          },
          404: {
            description: 'Either the student or teacher was not found.',
            type: 'object',
            properties: {
              error: { type: 'string', example: 'Teacher not found' },
            },
          },
          500: {
            description: 'Internal Server Error',
            type: 'object',
            properties: {
              error: { type: 'string', example: 'Internal Server Error' },
            },
          },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      // Extract student ID from route parameters and newTeacherId from the request body.
      const { studentId } = request.params as { studentId: number };
      const { newTeacherId } = request.body as { newTeacherId: number };

      // Validate the input.
      if (!newTeacherId) {
        return reply.status(400).send({ error: 'newTeacherId is required' });
      }

      try {
        // Ensure the new teacher exists.
        const newTeacher = await teacherRepo.findOneBy({
          teacherId: newTeacherId,
        });
        if (!newTeacher) {
          return reply.status(404).send({ error: 'Teacher not found' });
        }

        // Find the student by ID.
        const student = await studentRepo.findOne({
          where: { studentId: studentId },
          relations: ['teacher'],
        });
        if (!student) {
          return reply.status(404).send({ error: 'Student not found' });
        }

        // Reassign the student to the new teacher.
        student.teacher = newTeacher;
        await studentRepo.save(student);

        // Return a single JSON object containing all relevant info.
        return reply.send({
          message: 'Student reassigned successfully',
          student: {
            studentId: student.studentId,
            studentName: student.studentName,
          },
          newTeacher: {
            teacherId: newTeacher.teacherId,
            teacherName: newTeacher.teacherName,
          },
        });
      } catch (error) {
        request.log.error(error);
        return reply.status(500).send({ error: 'Internal Server Error' });
      }
    }
  );
}
