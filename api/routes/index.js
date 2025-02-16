"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = routes;
const studentInfoRoute_1 = __importDefault(require("./studentInfoRoute"));
const updateStudentTeacherRoute_1 = __importDefault(require("./updateStudentTeacherRoute"));
async function routes(fastify) {
    fastify.get('/', {
        schema: {
            description: 'Check API status',
            summary: 'Returns a message indicating that the GPA Monitoring Tool API is working',
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
    }, async (request, reply) => {
        return { message: 'GPA Monitoring Tool API is working!' };
    });
    // Register student info route
    fastify.register(studentInfoRoute_1.default, {
        prefix: '/students',
    });
    // Register student update route
    fastify.register(updateStudentTeacherRoute_1.default);
}
