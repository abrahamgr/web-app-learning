import type { Metadata } from 'next'
import { PropsWithChildren } from 'react'
import { SessionProvider } from 'next-auth/react'
import { Inter } from 'next/font/google'
import { PageTemplate } from '@/ui/organisms/PageTemplate'
import '../globals.css'
import { auth } from '@/auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rick & Morty',
}

export default async function RootLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const session = await auth()
  return (
    <html lang='en'>
      <body
        className={`${inter.className} bg-slate-800 text-base text-slate-50`}
      >
        <SessionProvider session={session}>
          <PageTemplate>{children}</PageTemplate>
        </SessionProvider>
      </body>
    </html>
  )
}
