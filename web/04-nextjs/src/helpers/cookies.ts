import { cookies } from 'next/headers'

export function setCookie(key: string, value: string) {
  const cookieStore = cookies()
  cookieStore.set(key, value, {
    // expires: Date.now()
    path: '/',
    secure: true,
    sameSite: true,
    httpOnly: true,
  })
}
