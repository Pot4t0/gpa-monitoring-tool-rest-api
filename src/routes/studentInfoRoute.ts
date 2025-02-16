import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { Student } from '../plugins/neon/entities/Student';
import { neonDataSource } from '../plugins/neon/orm';

const studentRepo = neonDataSource.getRepository(Student);
export default async function studentInfoRoute(fastify: FastifyInstance) {
  /*/
  Retrieves the following information for all students:
  a.	Name
  b.	Teacher’s name
  c.	Cumulative GPA
  /*/
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Find all students info
      const students = await studentRepo
        .createQueryBuilder('student')

        // Join teacher relation
        .leftJoin('student.teacher', 'teacher')

        // Join studentSemesterGrades relation to calculate GPA
        .leftJoin('student.studentSemesterGrades', 'ssg')
        .select('student.studentName', 'student_name')
        .addSelect('teacher.teacherName', 'teacher_name')

        // Calculate the cumulative GPA as the average of all semester GPA values, rounded to 2 decimals
        .addSelect('ROUND(AVG(ssg.gpaValue), 2)', 'cumulative_gpa')
        .groupBy('student.studentId')
        .addGroupBy('teacher.teacherName')
        .orderBy('student.studentId', 'ASC')
        .getRawMany();

      return students;
    } catch (error) {
      request.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
}
