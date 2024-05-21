import type { Character } from '@/types/character'
import { CharacterComponent } from './Character'

export interface CharacterListProps {
  characters: Character[]
  favoriteIds: number[]
}

export function CharacterList({ characters, favoriteIds }: CharacterListProps) {
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
          isFavorite={favoriteIds.includes(character.id)}
        />
      ))}
    </div>
  )
}
