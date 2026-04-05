import type { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const config: Record<string, Knex.Config> = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgresql://w4u:w4u_dev@localhost:5432/w4u_dev',
    migrations: {
      directory: './src/db/migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './src/db/seeds',
      extension: 'ts',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  staging: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './src/db/migrations',
      extension: 'ts',
    },
    pool: {
      min: 2,
      max: 20,
    },
  },

  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: './dist/db/migrations',
    },
    pool: {
      min: 5,
      max: 30,
    },
  },
};

export default config;
module.exports = config;
