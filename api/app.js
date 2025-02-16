"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const routes_1 = __importDefault(require("./routes"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const orm_1 = __importDefault(require("./plugins/neon/orm"));
require("dotenv/config");
const app = (0, fastify_1.default)({
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
    ajv: {
        customOptions: {
            strict: false,
        },
    },
});
// Register Swagger plugin
app.register(swagger_1.default, {
    openapi: {
        openapi: '3.0.0',
        info: {
            title: 'GPA Monitoring Tool API',
            description: 'API documentation for the GPA Monitoring Tool',
            version: '1.0.0',
        },
    },
});
app.register(swagger_ui_1.default, {
    routePrefix: '/docs',
});
// Register Neon ORM plugin
app.register(orm_1.default);
// Register routes
app.register(routes_1.default);
const start = async () => {
    try {
        await app.ready();
        app.swagger();
        await app.listen({ port: 3000 });
        app.log.info(`Server listening on port 3000`);
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();
