'use client'

import { signUp } from '@/actions/auth'
import { Form } from '@/ui/atoms/Form'
import { Label } from '@/ui/atoms/Label'
import { Button } from '@/ui/atoms/Button'
import { TextField } from '@/ui/atoms/TextField'
import Link from 'next/link'
import { paths } from '@/const/paths'

export function SignUp() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get('email') as string
    const username = formData.get('username') as string
    const password = formData.get('password') as string
    await signUp(username, email, password)
  }
  return (
    <Form name='about' className='*:mb-3 *:flex' onSubmit={handleSubmit}>
      <Label>
        Username
        <TextField name='username' as='text' />
      </Label>
      <Label>
        Email
        <TextField name='email' as='text' type='email' />
      </Label>
      <Label>
        Password
        <TextField name='password' as='text' type='password' />
      </Label>
      <Button>Sign Up</Button>
      <p>
        <Link href={paths.signIn}>Login</Link>
      </p>
    </Form>
  )
}
