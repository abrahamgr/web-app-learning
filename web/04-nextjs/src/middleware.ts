// import { NextResponse } from 'next/server'
import NextAuth from 'next-auth'
import { nextAuthConfig } from '@/auth/options'
// import { paths } from './const/paths'

export const middleware = NextAuth(nextAuthConfig).auth

// export const middleware = NextAuth(nextAuthConfig).auth((req) => {
//   const {
//     nextUrl: { origin, pathname },
//   } = req

//   if (req.auth) {
//     // if already authenticated go to root
//     if (pathname === paths.signIn || pathname === paths.signUp) {
//       const newUrl = new URL(paths.root, origin)
//       return NextResponse.redirect(newUrl)
//     }
//   } else {
//     // redirect to login
//     if (pathname === paths.favoriteCharacter) {
//       const newUrl = new URL(paths.signIn, origin)
//       return NextResponse.redirect(newUrl)
//     }
//   }
// })

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
