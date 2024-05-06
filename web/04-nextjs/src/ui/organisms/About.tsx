'use client'

import { useState, useTransition } from 'react'
import { Form } from '@/ui/atoms/Form'
import { Label } from '@/ui/atoms/Label'
import { Button } from '@/ui/atoms/Button'
import { TextField } from '@/ui/atoms/TextField'
import { sendFeedback } from '@/services/feedback'
import { FeedbackPayload } from '@/app/api/feedback/route'

export function About() {
  const [isPending, startTransition] = useTransition()
  const [isSuccess, setSuccess] = useState(false)
  const [isError, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const payload: FeedbackPayload = {
      name: formData.get('name') as string,
      subject: formData.get('subject') as string,
      comments: formData.get('comments') as string,
    }
    startTransition(() => {
      setSuccess(false)
      setError(false)
      sendFeedback(payload)
        .then(() => {
          setSuccess(true)
        })
        .catch(() => {
          setError(true)
        })
    })
  }

  return (
    <Form name='about' className='*:mb-3 *:flex' onSubmit={handleSubmit}>
      <span className='text-2xl font-bold'>About</span>
      <Label>
        Name
        <TextField name='name' as='text' required />
      </Label>
      <Label>
        Subject
        <TextField name='subject' as='text' required />
      </Label>
      <Label htmlFor='comments'>Comments</Label>
      <TextField
        as='textarea'
        name='comments'
        id='comments'
        placeholder='please enter your comments'
      />
      <Button type='submit' disabled={isPending}>
        Submit
      </Button>
      {isSuccess ? <p>Form submitted</p> : null}
      {isError ? <p className='text-red-300'>Something went wrong</p> : null}
    </Form>
  )
}
