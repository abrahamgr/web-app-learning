'use client'

import { ComponentProps } from 'react'
import { CharacterList } from '@/ui/organisms/CharacterList'

type CharacterProps = Pick<
  ComponentProps<typeof CharacterList>,
  'characters'
> & {
  favoriteIds: number[]
}

export function Characters({ characters, favoriteIds }: CharacterProps) {
  return <CharacterList characters={characters} favoriteIds={favoriteIds} />
}
