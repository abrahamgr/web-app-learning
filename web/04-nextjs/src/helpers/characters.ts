// import { FAVORITE_CHARACTER_KEY } from '@/const/cookies'
// import { cookies } from 'next/headers'
import { getFavorites } from '@/data/favorites'

export async function getCurrentFavoriteIds(): Promise<number[]> {
  // const cookieCharacterId = cookies().get(FAVORITE_CHARACTER_KEY)?.value
  // return cookieCharacterId
  //   ? cookieCharacterId.split(',').map((value) => Number(value))
  //   : []
  const items = await getFavorites()
  return items.map((item) => item.characterId)
}
