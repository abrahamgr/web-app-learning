import { paths } from '@/const/paths'
import { getCurrentFavoriteIds } from '@/helpers/characters'
import { getAllCharacters } from '@/services/getCharacter'
import { Characters } from '@/ui/pages/Characters'
import Link from 'next/link'

export default async function CharactersPage() {
  const characters = await getAllCharacters()
  const favoriteIds = getCurrentFavoriteIds()
  return (
    <>
      <Link href={paths.favoriteCharacter}>Favorites</Link>
      <Characters characters={characters} favoriteIds={favoriteIds} />
    </>
  )
}
