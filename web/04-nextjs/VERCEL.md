# Vercel

Here are some steps to deploy to Vercel using GitHub Actions, so go ahead and create a Vercel account.

- Go to [https://vercel.com/](https://vercel.com/)
- Click on `Sign Up`
- Select `Hobby` (free) as plan type
- Enter your name and complete details
  - You can use GitHub account or sign up with your email

Then proceed to instal `vercel CLI`.

```bash
npm add -g vercel
```

```bash
# login to vercel
vercel login
# create project
vercel project add rick-morty
```

## Database

Now go to [`Vercel`](https://vercel.com/), to create a Database using Postgress:

- Click on **your project** created
- Click on `Create Database`
- Select `Postgress`
- Enter the name and submit

## Link project

Now we have created a database and project link our local project

```bash

# link local project
vercel link --yes --project rick-morty
```

This will genera a file on `.vercel/project.json` with 2 properties (`projectId` and `orgId`) we will use to create GiHub secrets.

## Secrets

Go to your repository on GitHub

- Under Security section
- Click on `Secrets and Variables`
- Click on `Actions`
- Under Repository Secrets click on `New Repository Secret`
- Add the following values

### VERCEL_ORG_ID

This value from `.vercel/project.json` on `orgId` property.

### VERCEL_PROJECT_ID

This value from `.vercel/project.json` on `projectId` property.

### VERCEL_TOKEN

You need to go to your [Account on Vercel](https://vercel.com/account), click on `Tokens`, enter a token name like: `GitHub Action Rick and Morty`, select scope like `Personal` and expiration date you want (if expiration is different from `No Expiration` make sure you rotate your token) and click on `Generate`.
Copy the value and save somewhere else becayse this is not visible anymore, use this value to generate the secret on GitHub.

## Drizzle integration

Install depdencies

```bash
npm add drizzle-orm @vercel/postgres
npm add -D drizzle-kit
```

Create a constant to identify if app is running on DEV or PROD

```typescript
// src/const/config.ts
export const isProd = (process.env.NODE_ENV as string) === 'production'
```

Replace and add imports to handle Vercel DB.

```typescript
// src/db/index.ts
import { sql } from '@vercel/postgres'
import { drizzle as drizzleNode } from 'drizzle-orm/node-postgres'
import { drizzle as drizzleVercel } from 'drizzle-orm/vercel-postgres'

// replace db with, this way we use local DB for DEV and Vercel DB in PROD
export const db = isProd ? drizzleVercel(sql) : drizzleNode(client)
```

### DB migrations

**Note**: This is optional in case you want to hanle migrations on Vercel, otherwise you must generate the schema on the DB manually and then add the connection as `secret`.

To handle migrations you need run the followig commands:

- `npm run db:generate` to generate initial schema or when you modify existing schema, it will generate scripts to handle those changes.
- `npm rnu db:migrate` to execute migration scripts generated previously, usuatio called when schema was created for the first time or when there are changes in DB schema.

Add the following file to handle migrations on Vercel

```typescript
// drizzle-vercel.config.ts
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL as string,
  },
})
```

Go to Vercel a select you DB created or the one you want to use, click on the `psql` tab, then click on `show secret` and copy the value (starts with `postgres://default:`).
Then go to GihHub on your repository and add a new secret named `POSTGRES_URL` with the value of your connnection.

## GitHub Actions
