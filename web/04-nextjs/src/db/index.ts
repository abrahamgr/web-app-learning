import { sql } from '@vercel/postgres'
import { drizzle as drizzleNode } from 'drizzle-orm/node-postgres'
import { drizzle as drizzleVercel } from 'drizzle-orm/vercel-postgres'
import { Pool } from 'pg'
import { dbConfig } from '@/const/dbConfig'
import { isProd } from '@/const/clientConfig'

export const client = new Pool({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
})

export const db = isProd ? drizzleVercel(sql) : drizzleNode(client)
