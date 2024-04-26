'use server'

import { FAVORITE_CHARACTER_KEY } from '@/const/cookies'
import { setCookie } from '@/helpers/cookies'
import { cookies } from 'next/headers'

export async function setFavoriteCharacterAction(
  characterId: number,
): Promise<void> {
  console.log('setting favorite character', characterId)
  const cookieStore = cookies()
  const currentFavoriteId = cookieStore.get(FAVORITE_CHARACTER_KEY)?.value
  if (currentFavoriteId === `${characterId}`)
    cookieStore.delete(FAVORITE_CHARACTER_KEY)
  else setCookie(FAVORITE_CHARACTER_KEY, `${characterId}`)
}
