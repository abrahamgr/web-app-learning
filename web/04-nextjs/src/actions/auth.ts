'use server'

import { signIn, signOut } from '@/auth'
import { paths } from '@/const/paths'
import { userExists, registerUser } from '@/data/auth'
import { hashPassword } from '@/utilities/crypto'
import { logger } from '@/utilities/logger'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signUp(
  username: string,
  email: string,
  password: string,
) {
  if (await userExists(username)) {
    logger.warn({ username }, 'user already exists')
    throw new Error('user already exists')
  }

  const passwordHased = hashPassword(password)
  await registerUser(username, email, passwordHased)
  logger.info({ username }, 'user registered')
}

export async function logOut() {
  await signOut({ redirectTo: paths.root })
}

export async function login(formData: FormData) {
  await signIn('credentials', formData)
  const callbackUrl = cookies().get('authjs.callback-url')?.value ?? paths.root
  logger.info({ callbackUrl }, 'redirecting to')
  redirect(callbackUrl)
}
