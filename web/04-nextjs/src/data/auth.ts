import { eq, and } from 'drizzle-orm'
import { db } from '@/db'
import { users } from '@/db/schema'
import { hashPassword } from '@/utilities/crypto'
import { logger } from '@/utilities/logger'

export async function userExists(username: string): Promise<boolean> {
  const existingUser = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.name, username))
  return existingUser.length > 0
}

export async function registerUser(
  username: string,
  email: string,
  passwordHashed: string,
): Promise<void> {
  await db
    .insert(users)
    .values({ name: username, email, password: passwordHashed })
}

export async function findUserByEmailAndPassword(
  email: string,
  password: string,
) {
  try {
    const passswordHashed = hashPassword(password)
    const usersFound = await db
      .select()
      .from(users)
      .where(and(eq(users.email, email), eq(users.password, passswordHashed)))

    if (usersFound.length !== 1) {
      logger.warn({ email }, "user not found or password doesn't match")
      return null
    }
    const user = usersFound[0]
    return user
  } catch (error) {
    logger.error({ error }, 'findUserByEmailAndPassword')
    return null
  }
}
