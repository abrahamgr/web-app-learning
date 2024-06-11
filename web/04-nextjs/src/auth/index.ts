import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { signInSchema } from '@/schema/auth'
import { db } from '@/db'
import { findUserByEmailAndPassword } from '@/data/auth'
import { nextAuthConfig } from '@/auth/options'

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...nextAuthConfig,
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { success, data } = signInSchema.safeParse(credentials)

        if (!success) return null
        return await findUserByEmailAndPassword(data.email, data.password)
      },
    }),
  ],
})
