import { FAVORITE_CHARACTER_KEY } from '@/const/cookies'
import { paths } from '@/const/paths'
import { getAllCharacters } from '@/services/getCharacter'
import { Characters } from '@/ui/pages/Characters'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function CharactersPage() {
  const characters = await getAllCharacters()
  const cookieCharacterId = cookies().get(FAVORITE_CHARACTER_KEY)?.value
  return (
    <>
      <Link href={paths.favoriteCharacter}>Favorites</Link>
      <Characters characters={characters} favoriteId={cookieCharacterId} />
    </>
  )
}
