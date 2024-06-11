import { auth } from '@/auth'
import { paths } from '@/const/paths'
import Link from 'next/link'
import { LogOut } from './LogOut'

export async function Header() {
  const session = await auth()
  return (
    <header className='flex w-full justify-end py-3 pr-5'>
      {session ? (
        <>
          <span>Welcome {session.user?.name} -&nbsp;</span>
          <LogOut />
        </>
      ) : (
        <Link href={paths.signIn} className='cursor-pointer'>
          Login
        </Link>
      )}
    </header>
  )
}
