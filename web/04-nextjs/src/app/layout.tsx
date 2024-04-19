import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { PageTemplate } from '@/ui/organisms/PageTemplate'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rick & Morty',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} bg-slate-800 text-base text-slate-50`}
      >
        <PageTemplate>{children}</PageTemplate>
      </body>
    </html>
  )
}
