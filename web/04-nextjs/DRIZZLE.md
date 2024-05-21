# Drizzle

## Local

Install dependencies

```bash
npm add drizzle-orm pg
npm add -D drizzle-kit @types/pg

```

Create dbConfig.ts with .env variables

```typescript
// src/const/dbConfig.ts
interface DBConfig {
  port: number
  host: string
  user: string
  password: string
  database: string
}

export const dbConfig: DBConfig = {
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  host: process.env.DB_SERVER as string,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_DB_NAME as string,
}
```

Add you env variables on `.env`

```env
# DB
DB_USER=admin
DB_PASSWORD=Admin1234
DB_SERVER=localhost
DB_DB_NAME=rickmorty

```

Add `drizzle.config.ts`

```typescript
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
```

Create your initial schema

```typescript
// src/db/schema.ts
// adjust schema based on your requirements
import { pgTable, serial, integer, timestamp } from 'drizzle-orm/pg-core'

export const favorites = pgTable('favorites', {
  id: serial('id').primaryKey().notNull(),
  characterId: integer('characterId').notNull(),
  created: timestamp('created').defaultNow().notNull(),
})

export type FavoritesSelect = typeof favorites.$inferSelect
export type FavoritesInsert = typeof favorites.$inferInsert
```

Create your db connection

```typescript
// src/db/index.ts
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { dbConfig } from '@/const/dbConfig'

export const client = new Pool({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
})

export const db = drizzle(client)
```

Add the following commands to handle migrations

```js
// package.json
  "db:generate": "drizzle-kit generate",
  "db:migrate": "drizzle-kit migrate",

```

Generate migration and push changes to DB.

**Note:** Please make sure your DB `rickmorty` was previously created.

```bash
# generate schema
npm run db:generate
# push changes to DB
npm run db:migrate
```
