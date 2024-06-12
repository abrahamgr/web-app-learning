import { Form } from '@/ui/atoms/Form'
import { Label } from '@/ui/atoms/Label'
import { Button } from '@/ui/atoms/Button'
import { TextField } from '@/ui/atoms/TextField'
import Link from 'next/link'
import { paths } from '@/const/paths'
import { login } from '@/actions/auth'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { logger } from '@/utilities/logger'

interface SignInProps {
  callbackUrl?: string
}

export async function SignIn({ callbackUrl }: SignInProps) {
  const session = await auth()
  if (session?.user && callbackUrl) {
    if (new URL(callbackUrl).pathname !== paths.signIn) {
      logger.info({ callbackUrl }, 'redirect from login')
      redirect(callbackUrl)
    } else redirect(paths.root)
  }

  return (
    <Form className='*:mb-3 *:flex' action={login}>
      <Label>
        Email
        <TextField name='email' as='text' type='email' />
      </Label>
      <Label>
        Password
        <TextField name='password' as='text' type='password' />
      </Label>
      <Button>Sign In</Button>
      <p>
        <Link href={paths.signUp}>Or register</Link>
      </p>
    </Form>
  )
}
