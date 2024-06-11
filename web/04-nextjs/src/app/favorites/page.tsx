import { paths } from '@/const/paths'
import { getFavorites } from '@/data/favorites'
import { getMultipleCharacters } from '@/services/getCharacter'
import { Characters } from '@/ui/pages/Characters'
import Link from 'next/link'

/**
 * makes dynamic behavior of page
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
 */
export const dynamic = 'force-dynamic'

export default async function FavoritePage() {
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
