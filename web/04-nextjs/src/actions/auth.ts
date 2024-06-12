'use server'

import { signIn, signOut } from '@/auth'
import { paths } from '@/const/paths'
import { userExists, registerUser } from '@/data/auth'
import { hashPassword } from '@/utilities/crypto'
import { logger } from '@/utilities/logger'
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
  const options = {
    ...Object.fromEntries(formData),
    redirect: false,
  }
  logger.info(options, 'signin')
  let callbackUrl = ''
  try {
    callbackUrl = await signIn('credentials', options)
  } catch (error) {
    logger.error(error, 'login')
    throw new Error('unable to login')
  } finally {
    // redirect must be in the finally to avoid error 'NEXT_REDIRECT'
    if (callbackUrl) {
      const callbackUrlValue = new URL(callbackUrl).searchParams.get(
        'callbackUrl',
      )
      logger.info({ callbackUrlValue }, 'callback redirect')
      if (callbackUrlValue) redirect(callbackUrl)
    }
  }
}
