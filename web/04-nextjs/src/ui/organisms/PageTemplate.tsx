import { PropsWithChildren } from 'react'
import { Main } from '@/ui/atoms/Main'
import { Header, Footer } from '@/ui/molecules'

export function PageTemplate({ children }: PropsWithChildren) {
  return (
    <Main>
      {/* <Header /> */}
      {children}
      {/* <Footer /> */}
    </Main>
  )
}
