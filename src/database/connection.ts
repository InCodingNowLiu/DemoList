import * as knex from 'knex';
import * as dotenv from 'dotenv';

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

export const connection = knex(config);
