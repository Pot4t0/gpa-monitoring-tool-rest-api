"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = studentInfoRoute;
const Student_1 = require("../plugins/neon/entities/Student");
const orm_1 = require("../plugins/neon/orm");
const studentRepo = orm_1.neonDataSource.getRepository(Student_1.Student);
async function getInfoQueryBuilder() {
    return await studentRepo
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
        .orderBy('student.studentId', 'ASC');
}
async function studentInfoRoute(fastify) {
    /*/
    QUESTION 2
    Retrieves the following information for all students:
    a.	Name
    b.	Teacher’s name
    c.	Cumulative GPA
    /*/
    fastify.get('/', {
        schema: {
            description: 'Retrieve all students with their teacher and cumulative GPA calculated over all semesters.',
            summary: 'Get all students information',
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            student_name: { type: 'string', example: 'Student One' },
                            teacher_name: { type: 'string', example: 'Alice Johnson' },
                            cumulative_gpa: { type: 'string', example: '1.63' },
                        },
                        required: ['student_name', 'teacher_name', 'cumulative_gpa'],
                    },
                },
            },
        },
    }, async (request, reply) => {
        try {
            // Find all students info
            const studentsInfo = await getInfoQueryBuilder();
            return await studentsInfo.getRawMany();
        }
        catch (error) {
            request.log.error(error);
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });
    /*/
    QUESTION 4
    Get the cumulative GPA of all students in a specified timeframe
    /*/
    fastify.get('/gpa', {
        schema: {
            description: 'Retrieve each student’s cumulative GPA. If query parameters "start" and "end" are provided, the GPA is calculated only over that timeframe.',
            summary: 'Get cumulative GPA by timeframe',
            querystring: {
                type: 'object',
                properties: {
                    start: {
                        type: 'string',
                        example: '7',
                        description: 'Starting semester ID',
                    },
                    end: {
                        type: 'string',
                        example: '8',
                        description: 'Ending semester ID',
                    },
                },
            },
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            student_name: { type: 'string', example: 'Student One' },
                            teacher_name: { type: 'string', example: 'Alice Johnson' },
                            cumulative_gpa: { type: 'string', example: '4.00' },
                        },
                        required: ['student_name', 'teacher_name', 'cumulative_gpa'],
                    },
                },
            },
        },
    }, async (request, reply) => {
        // Read optional query parameters.
        const { start, end } = request.query;
        try {
            // Start building the query.
            let queryBuilder = await getInfoQueryBuilder();
            // If a timeframe is provided, filter the grades by the semester ID range.
            if (start && end) {
                const startSem = parseInt(start, 10);
                const endSem = parseInt(end, 10);
                queryBuilder = queryBuilder.where('ssg.semester_id BETWEEN :startSem AND :endSem', { startSem, endSem });
            }
            const students = await queryBuilder.getRawMany();
            return students;
        }
        catch (error) {
            request.log.error(error);
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });
}
