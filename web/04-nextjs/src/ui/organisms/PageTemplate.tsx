import { PropsWithChildren } from 'react'
import { Main } from '@/ui/atoms/Main'
import { Header } from '@/ui/molecules'

interface PageTemplateProps extends PropsWithChildren {
  hideHeader?: boolean
}

export function PageTemplate({
  children,
  hideHeader = false,
}: PageTemplateProps) {
  return (
    <Main>
      {hideHeader ? null : <Header />}
      {children}
      {/* <Footer /> */}
    </Main>
  )
}
