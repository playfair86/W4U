import knex, { Knex } from 'knex';
import { config } from './index';

const knexConfig: Knex.Config = {
  client: 'pg',
  connection: config.database.url,
  pool: {
    min: 2,
    max: 10,
  },
};

export const db = knex(knexConfig);
export default db;
