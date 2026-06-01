import { Kysely, PostgresDialect } from 'kysely'
import pg from 'pg'

import { config } from '../config'
import type { Database } from './types'

const { Pool } = pg

if (!config.databaseUrl) {
  throw new Error('DATABASE_URL is required')
}

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: config.databaseUrl,
    }),
  }),
})
