import { paths } from '@/const/paths'
import { ClientCharacter } from '@/ui/organisms/ClientCharacter'
import Link from 'next/link'

export default async function ServerPage() {
  return (
    <>
      <Link href={paths.serverComponent}>Sever component</Link>
      <ClientCharacter />
    </>
  )
}
