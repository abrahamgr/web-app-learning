import { paths } from '@/const/paths'
import { getCharacter } from '@/services/getCharacter'
import { CharacterComponent } from '@/ui/organisms/Character'
import Link from 'next/link'

export default async function ServerPage() {
  const character = await getCharacter(1)
  return (
    <>
      <Link href={paths.clientComponent}>Client component</Link>
      <CharacterComponent character={character} />
    </>
  )
}
