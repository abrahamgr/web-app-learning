import { Character } from '@/types/Character'
import { CharacterComponent } from './Character'
// import { cookies } from 'next/headers'
// import { FAVORITE_CHARACTER_KEY } from '@/const/cookies'

export interface CharacterListProps {
  characters: Character[]
  onFavorite: (characterId: number) => void
  favoriteId?: string
}

export function CharacterList({
  characters,
  onFavorite,
  favoriteId,
}: CharacterListProps) {
  if (!characters) return null
  /**
   * this wont work since it uses cookies and they are available only
   * on server side
   */
  // const cookieCharacterId = cookies().get(FAVORITE_CHARACTER_KEY)?.value
  return (
    <div className='flex flex-wrap content-between p-3 *:m-2'>
      {characters.map((character) => (
        <CharacterComponent
          key={character.id}
          character={character}
          isFavorite={favoriteId ? character.id === Number(favoriteId) : false}
          onFavorite={onFavorite}
        />
      ))}
    </div>
  )
}
