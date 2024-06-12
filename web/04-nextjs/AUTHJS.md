# Next Auth

This is a guide how to implement [Auth.js](https://authjs.dev/), this is a sumary of [this guide](https://authjs.dev/getting-started/installation?framework=next.js).

Some of you have told me it has been complicated to implement so I created this guide to help you.

## Installation

Install the `beta` version of it to get types and easy implementation for app router.

```bash
npm install next-auth@beta
```

Add an environment variable to `.env` or `.env.local` depends on what file you're using, and generate a random string to assign the value (it can be any word).
**Note:** If you are using windows and PowerShell you can set any word you want, it's not required to be a random string but is highly recommended.

```bash
# if you are using Mac or Windows WSL
openssl rand -base64 33
```

```bash
# .env or .env.local
AUTH_SECRET=secret
```

## Setup

Add a folder `auth` in the `src` or at the root of your project if you are not using `src` folder.

Base configuration, it contains basic configuration and we will use this to re-use in middleware.
Create a file named `options.ts` inside the folder we created `auth`

```typescript
import { NextAuthConfig } from 'next-auth'

export const nextAuthConfig: NextAuthConfig = {
  trustHost: true,
  session: {
    strategy: 'jwt',
  },
  // configure and create the following pages
  pages: {
    signIn: '/login', // route to customize your login page
    newUser: '/register', // route to customize your login page
  },
  callbacks: {
    authorized({
      auth,
      request: {
        nextUrl: { pathname },
      },
    }) {
      /**
       * validate routes we need to protect with authentication
       * @example /dasbboard I want to allow only authenticated
       * to view this page
       * @return false if user is not authenticated, do the same for all routes you want to protect
       */
      if (pathname === '/dashboard') return !!auth?.user
      return true
    },
    async jwt({ token, user: jwtUser, trigger }) {
      // add values to the token
      if (trigger === 'signIn') {
        token.id = jwtUser.id
      }

      return token
    },
    async session({ session, token }) {
      // send properties to the client
      session.user.id = token.sub as string
      return session
    },
  },
  // leave providers empty
  providers: [],
}
```

Now setup Crendentials provider to handle local user authentication, create a file `index.ts` inside the `auth` folder we just created.
I followed this [guide](https://authjs.dev/getting-started/authentication/credentials) with some adjustments.

```typescript
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { signInSchema } from '@/schema/auth'
// adjust from your db provider
import { db } from '@/db'
import { nextAuthConfig } from '@/auth/options'

export const { handlers, signIn, signOut, auth } = NextAuth({
  // options we previously created
  ...nextAuthConfig,
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        /**
         * This signInSchema is taken from here
         * https://authjs.dev/getting-started/authentication/credentials#verifying-data-with-zod
         */
        const { success, data } = signInSchema.safeParse(credentials)

        if (!success) return null
        /**
         * this function will find your username and hashed (or plain, not recommended) password on DB
         * and return null if user is not found, so create your own function to validate it.
         * On this step you have already created an schema to handle users
         */
        return await findUserByEmailAndPassword(data.email, data.password)
      },
    }),
  ],
})
```

## Forms

You need to create 2 forms, one for Login and other one for Register
Consider [this](https://authjs.dev/getting-started/authentication/credentials#signin-form) an an example:

```jsx
// this signIn comes from the section above
import { signIn } from '@/auth'

export function SignIn() {
  return (
    <form
      action={async (formData) => {
        'use server'
        await signIn('credentials', formData)
      }}
    >
      <label>
        Email
        <input name='email' type='email' />
      </label>
      <label>
        Password
        <input name='password' type='password' />
      </label>
      <button>Sign In</button>
    </form>
  )
}
```

After you submit the form you are authenticated but not redirected automatically, so you need to take care of that.

## Middleware

This section is optional but it's required if you need to use the `callback` named `authorized`.
I have been struggling with this due to the middleware runs in a different context ([`edge runtime`](https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes#runtime-differences)) so we cannot re-use the `auth` function we created preciously so we proceed to create a new instance that will contains all required to run properly.

This is already documented [here](https://authjs.dev/guides/edge-compatibility) so please take a look to understant a little bit more.

So we proceed a create a middleware (it should be at the same level of the `app` folder) for your app, read some [docs](https://nextjs.org/docs/app/building-your-application/routing/middleware) to know more about it.

```typescript
import NextAuth from 'next-auth'
import { nextAuthConfig } from '@/auth/options'

// create a new instance with the base nextAuthConfig and export as middleware
export const middleware = NextAuth(nextAuthConfig).auth

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

After implement this you will be able to use the `authorized` callback to check if user is able to visit an specific page.

## Database Schema

I can't remember from where I got the schema but this is the schema by default Auth.js needs, I only add the `password` column to the users table.

Maybe we dont use all tables but is good to have them in case you want to explor emore options.

```typescript
/** Auth */

export const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  // I added this column by myself
  password: text('password').notNull(),
  email: text('email').notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
})

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
)

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
})

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  }),
)

export const authenticators = pgTable(
  'authenticator',
  {
    credentialID: text('credentialID').notNull().unique(),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    providerAccountId: text('providerAccountId').notNull(),
    credentialPublicKey: text('credentialPublicKey').notNull(),
    counter: integer('counter').notNull(),
    credentialDeviceType: text('credentialDeviceType').notNull(),
    credentialBackedUp: boolean('credentialBackedUp').notNull(),
    transports: text('transports'),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  }),
)
/** Auth */
```
