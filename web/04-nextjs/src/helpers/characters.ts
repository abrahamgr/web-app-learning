import { FAVORITE_CHARACTER_KEY } from '@/const/cookies'
import { cookies } from 'next/headers'

export function getCurrentFavoriteIds(): number[] {
  const cookieCharacterId = cookies().get(FAVORITE_CHARACTER_KEY)?.value
  return cookieCharacterId
    ? cookieCharacterId.split(',').map((value) => Number(value))
    : []
}
