'use client'

import { useEffect, useState } from 'react'
import { CharacterComponent } from './Character'
import type { Character } from '@/types/character'
import { getCharacter } from '@/services/getCharacter'
import { useSession } from 'next-auth/react'

export function ClientCharacter() {
  const [character, setCharacter] = useState<Character | undefined>(undefined)
  const session = useSession()

  useEffect(() => {
    const loadCharacter = async () => {
      const data = await getCharacter(3)
      setCharacter(data)
    }
    void loadCharacter()
  }, [])

  if (!character) return null
  return (
    <>
      {session.status === 'authenticated' ? (
        <p>userid: {session.data.user?.id}</p>
      ) : null}
      <CharacterComponent character={character} />
    </>
  )
}
