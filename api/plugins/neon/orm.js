"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.neonDataSource = void 0;
const typeorm_1 = require("typeorm");
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
require("dotenv/config");
const entities = [`${__dirname}/entities/*.ts`, `${__dirname}/entities/*.js`];
// Define default connection options
const defaultOptions = {
    type: 'postgres',
    url: process.env.NEON_DATABASE_URL,
    ssl: true,
    synchronize: true, // Only for development; disable in production.
    logging: false,
    entities: entities,
};
exports.neonDataSource = new typeorm_1.DataSource(defaultOptions);
const ormPlugin = async (fastify) => {
    await exports.neonDataSource.initialize();
    fastify.decorate('typeorm', exports.neonDataSource);
};
exports.default = (0, fastify_plugin_1.default)(ormPlugin, {
    name: 'fastify-typeorm',
});
