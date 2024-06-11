'use server'

import { auth } from '@/auth'
import { paths } from '@/const/paths'
import { setFavorite } from '@/data/favorites'
import { redirect } from 'next/navigation'

export const setFavoriteAction = async (characterId: number) => {
  const session = await auth()
  if (!session?.user) {
    redirect(paths.signIn)
  } else await setFavorite(characterId)
}
