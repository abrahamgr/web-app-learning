import { PropsWithChildren } from 'react'

export function Main({ children }: PropsWithChildren) {
  return (
    <main className='flex flex-col items-center justify-between'>
      {children}
    </main>
  )
}
