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
  QUESTION 3
  Update your data to assign a student from one teacher to another. This reassignment should affect all past data.
  /*/
  fastify.put(
    '/:studentId/teacher',
    async (request: FastifyRequest, reply: FastifyReply) => {
      // Extract student ID from route parameters and newTeacherId from the request body.
      const { studentId } = request.params as { studentId: string };
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
          where: { studentId: parseInt(studentId, 10) },
          relations: ['teacher'], // include teacher relation if needed
        });
        if (!student) {
          return reply.status(404).send({ error: 'Student not found' });
        }

        // Reassign the student to the new teacher.
        student.teacher = newTeacher;
        await studentRepo.save(student);

        return reply.send({
          message: 'Student reassigned successfully',
          student,
        });
      } catch (error) {
        request.log.error(error);
        return reply.status(500).send({ error: 'Internal Server Error' });
      }
    }
  );
}
