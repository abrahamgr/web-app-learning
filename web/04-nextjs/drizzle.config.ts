// load env variables for vercel
import './envConfig'
import { defineConfig } from 'drizzle-kit'
import { dbConfig } from '@/const/dbConfig'

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
  },
})
