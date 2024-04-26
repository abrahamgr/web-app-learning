'use client'

import { ComponentProps } from 'react'
import { CharacterComponent } from '../organisms/Character'
import { setFavoriteCharacter } from '@/services/setFavoriteCharacter'
// using acation will revalidate ui
import { setFavoriteCharacterAction } from '@/actions/character'

type FavoritesProps = Pick<
  ComponentProps<typeof CharacterComponent>,
  'character'
>

export function Favorites({ character }: FavoritesProps) {
  return (
    <CharacterComponent
      character={character}
      isFavorite
      onFavorite={setFavoriteCharacterAction}
    />
  )
}
