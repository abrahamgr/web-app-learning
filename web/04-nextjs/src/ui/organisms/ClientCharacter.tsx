'use client'

import { useEffect, useState } from 'react'
import { CharacterComponent } from './Character'
import { Character } from '@/types/character'
import { getCharacter } from '@/services/getCharacter'
import { setFavoriteCharacterAction } from '@/actions/character'

export function ClientCharacter() {
  const [character, setCharacter] = useState<Character | undefined>(undefined)

  useEffect(() => {
    const loadCharacter = async () => {
      const data = await getCharacter(3)
      setCharacter(data)
    }
    void loadCharacter()
  }, [])

  if (!character) return null
  return (
    <CharacterComponent
      character={character}
      onFavorite={setFavoriteCharacterAction}
    />
  )
}
