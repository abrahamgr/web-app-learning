import { signIn } from '@/auth'
import { Form } from '@/ui/atoms/Form'
import { Label } from '@/ui/atoms/Label'
import { Button } from '@/ui/atoms/Button'
import { TextField } from '@/ui/atoms/TextField'

export function SignIn() {
  return (
    <Form
      className='*:mb-3 *:flex'
      action={async (formData) => {
        'use server'
        await signIn('credentials', formData)
      }}
    >
      <Label>
        Email
        <TextField name='email' as='text' type='email' />
      </Label>
      <Label>
        Password
        <TextField name='password' as='text' type='password' />
      </Label>
      <Button>Sign In</Button>
    </Form>
  )
}
