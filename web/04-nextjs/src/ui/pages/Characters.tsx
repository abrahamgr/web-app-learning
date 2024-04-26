'use client'

import { ComponentProps } from 'react'
import { CharacterList } from '@/ui/organisms/CharacterList'
// import { setFavoriteCharacter } from '@/services/setFavoriteCharacter'
// using acation will revalidate ui
import { setFavoriteCharacterAction } from '@/actions/character'

type CharacterProps = Pick<
  ComponentProps<typeof CharacterList>,
  'characters'
> & {
  favoriteId?: string
}

export function Characters({ characters, favoriteId }: CharacterProps) {
  return (
    <CharacterList
      characters={characters}
      onFavorite={(id) => setFavoriteCharacterAction(id)}
      favoriteId={favoriteId}
    />
  )
}
