import { FAVORITE_CHARACTER_KEY } from '@/const/cookies'
import { paths } from '@/const/paths'
import { getCharacter } from '@/services/getCharacter'
import { Favorites } from '@/ui/pages/Favorites'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function FavoritePage() {
  const cookieCharacterId = cookies().get(FAVORITE_CHARACTER_KEY)?.value
  if (!cookieCharacterId)
    return (
      <>
        <Link href={paths.allCharacters}>Favorites</Link>
        <p>No favorite character</p>
      </>
    )
  const character = await getCharacter(Number(cookieCharacterId))
  return (
    <>
      <Link href={paths.allCharacters}>Favorites</Link>
      <Favorites character={character} />
    </>
  )
}
