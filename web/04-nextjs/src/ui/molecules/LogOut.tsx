import { signOut } from '@/auth'
import { paths } from '@/const/paths'

export function LogOut() {
  return (
    <form
      action={async () => {
        'use server'
        await signOut({ redirectTo: paths.root })
      }}
    >
      <button type='submit'>Sign Out</button>
    </form>
  )
}
