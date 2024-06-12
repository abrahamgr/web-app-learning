import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { signInSchema } from '@/schema/auth'
import { db } from '@/db'
import { findUserByEmailAndPassword } from '@/data/auth'
import { nextAuthConfig } from '@/auth/options'
import { logger } from '@/utilities/logger'

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...nextAuthConfig,
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      // define fields to render if you plan to use native signin page
      credentials: {
        email: { label: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      type: 'credentials',
      authorize: async (credentials) => {
        const { success, data } = signInSchema.safeParse(credentials)

        if (!success) return null
        return await findUserByEmailAndPassword(data.email, data.password)
      },
    }),
  ],
  logger: {
    error(code, ...message) {
      logger.error(code, JSON.stringify(message))
    },
    warn(code, ...message) {
      logger.warn(code, message)
    },
  },
})
