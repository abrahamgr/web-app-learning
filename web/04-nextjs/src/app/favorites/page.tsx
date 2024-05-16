import { paths } from '@/const/paths'
import { getFavorites } from '@/data/favorites'
// import { getCurrentFavoriteIds } from '@/helpers/characters'
import { getMultipleCharacters } from '@/services/getCharacter'
import { Characters } from '@/ui/pages/Characters'
import Link from 'next/link'

export default async function FavoritePage() {
  // const favoriteIds = getCurrentFavoriteIds()
  const favoriteIds = (await getFavorites()).map((item) => item.characterId)
  const characters = await getMultipleCharacters(favoriteIds)
  return (
    <>
      <Link href={paths.allCharacters}>Characters</Link>
      {characters ? (
        <Characters characters={characters} favoriteIds={favoriteIds} />
      ) : null}
    </>
  )
}
