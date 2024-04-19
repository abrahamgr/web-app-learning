'use client'

import { useEffect, useState } from 'react'
import { CharacterComponent } from './Character'
import { Character } from '@/types/Character'
import { getCharacter } from '@/services/getCharacter'

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
  return <CharacterComponent character={character} />
}
