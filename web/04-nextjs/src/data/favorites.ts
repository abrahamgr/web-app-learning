import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { favorites } from '@/db/schema'
import { logger } from '@/utilities/logger'
import 'server-only'

export async function setFavorite(characterId: number) {
  try {
    // find existing favorite
    const rows = await db
      .select({ id: favorites.id })
      .from(favorites)
      .where(eq(favorites.characterId, characterId))

    // if exists delete
    if (rows.length > 0) {
      logger.info({ characterId }, 'deleteing characterId')
      await db.delete(favorites).where(eq(favorites.id, rows[0].id))
      return 0
    }

    logger.info({ characterId }, 'inserting characterId')
    const [{ id }] = await db
      .insert(favorites)
      .values({ characterId })
      .returning({ id: favorites.id })
    return id
  } catch (error) {
    logger.info({ error }, 'setFavorite')
    throw error
  }
}

export async function getFavorites() {
  try {
    // const selectFavorite: Record<keyof FavoritesSelect, PgColumn> = {
    //   id: favorites.id,
    //   characterId: favorites.characterId,
    //   created: favorites.created,
    // }
    const result = await db
      .select({
        id: favorites.id,
        characterId: favorites.characterId,
        created: favorites.created,
      })
      .from(favorites)
    return result
  } catch (error) {
    logger.error({ error }, 'setFavorite')
    throw error
  }
}
