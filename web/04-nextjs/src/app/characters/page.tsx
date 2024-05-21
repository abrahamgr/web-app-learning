import Link from 'next/link'
import { paths } from '@/const/paths'
import { getCurrentFavoriteIds } from '@/helpers/characters'
import { getAllCharacters } from '@/services/getCharacter'
import { Characters } from '@/ui/pages/Characters'
import { Pagination } from '@/ui/molecules/Pagination'
import type { PageProps } from '@/types/page'
import type { Character } from '@/types/character'

export default async function CharactersPage({ searchParams }: PageProps) {
  const currentPage = searchParams.page ?? '1'
  const {
    results: characters,
    info: { pages },
  } = await getAllCharacters<Character[]>(currentPage)
  const favoriteIds = await getCurrentFavoriteIds()
  return (
    <>
      <Link href={paths.favoriteCharacter}>Favorites</Link>
      <Characters characters={characters ?? []} favoriteIds={favoriteIds} />
      <Pagination
        currentPage={currentPage}
        lastPage={`${pages}`}
        path={paths.allCharacters}
      />
    </>
  )
}
