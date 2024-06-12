import { NextAuthConfig } from 'next-auth'
import { paths } from '@/const/paths'

/**
 * initial the options to re-use in middleware implementation
 * we cannot use the same response from NextAuth due to restrictions
 * middleware has
 */
export const nextAuthConfig: NextAuthConfig = {
  // trustHost: true,
  debug: process.env.NODE_ENV !== 'production',
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: paths.signIn,
    newUser: paths.signUp,
  },
  callbacks: {
    authorized({
      auth,
      request: {
        nextUrl: { pathname },
      },
    }) {
      if (pathname === paths.favoriteCharacter) return !!auth?.user
      return true
    },
    async jwt({ token, user: jwtUser, trigger }) {
      if (trigger === 'signIn') {
        token.id = jwtUser.id
        token.email = jwtUser.email
        token.picture = jwtUser.image
      }

      return token
    },
    async session({ session, token }) {
      session.user.id = token.sub as string
      return session
    },
  },
  providers: [],
}
