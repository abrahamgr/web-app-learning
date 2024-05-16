'use server'

import { FAVORITE_CHARACTER_KEY } from '@/const/cookies'
import { getCurrentFavoriteIds } from '@/helpers/characters'
import { setCookie } from '@/helpers/cookies'

export async function setFavoriteCharacterAction(
  characterId: number,
): Promise<void> {
  const favoriteIds = await getCurrentFavoriteIds()
  let newFavorites: number[] = []

  if (favoriteIds.includes(characterId))
    newFavorites = favoriteIds.filter((id) => id !== characterId)
  else newFavorites = [...favoriteIds, characterId]

  setCookie(FAVORITE_CHARACTER_KEY, newFavorites.join(','))
}
