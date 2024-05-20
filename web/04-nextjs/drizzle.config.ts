// load env variables for vercel
import './envConfig'
import { defineConfig } from 'drizzle-kit'
import { dbConfig } from '@/const/dbConfig'
import { isProd } from '@/const/clientConfig'

const localConfig = defineConfig({
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

const vercelConfig = defineConfig({
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL as string,
  },
})

export default isProd ? vercelConfig : localConfig
