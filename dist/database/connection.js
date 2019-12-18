"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex = require("knex");
const dotenv = require("dotenv");
dotenv.config();
const config = {
    client: 'pg',
    connection: {
        database: process.env.SQL_DATABASE,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        host: process.env.SQL_HOST,
        port: process.env.SQL_PORT,
    },
    pool: {
        min: 2,
        max: 20,
    },
    // open debug model
    debug: true,
};
exports.connection = knex(config);
//# sourceMappingURL=connection.js.map