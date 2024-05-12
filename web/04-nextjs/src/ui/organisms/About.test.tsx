import { render, screen } from '@testing-library/react'
import { About } from './About'
import userEvent from '@testing-library/user-event'
import { server } from '@/mocks/server'
import { submitFeedbackError } from '@/mocks/feedback'

test('render About', () => {
  render(<About />)
  expect(screen.getByText('Name')).toBeInTheDocument()
  expect(screen.getByText('Subject')).toBeInTheDocument()
  expect(screen.getByText('Comments')).toBeInTheDocument()
  expect(screen.getByText('Submit')).toBeInTheDocument()
  expect(screen.getAllByRole('textbox').length).toBe(3)
})

async function typeOnInput(name: string, value: string) {
  const input = screen.getByRole('textbox', { name })
  await userEvent.type(input, value)
  return input
}

test('submit success', async () => {
  render(<About />)
  const nameInput = await typeOnInput('Name', 'Abraham')
  const subjectInput = await typeOnInput('Subject', 'My feedback')
  const commentsInput = await typeOnInput('Comments', 'My comments')
  expect(nameInput).toBeRequired()
  expect(subjectInput).toBeRequired()
  expect(commentsInput).not.toBeRequired()
  await userEvent.click(screen.getByText('Submit'))
  expect(await screen.findByText('Form submitted')).toBeInTheDocument()
})

test('submit failed', async () => {
  // replace handler with failed scenario
  server.use(submitFeedbackError)
  render(<About />)
  const nameInput = await typeOnInput('Name', 'Abraham')
  const subjectInput = await typeOnInput('Subject', 'My feedback')
  const commentsInput = await typeOnInput('Comments', 'My comments')
  expect(nameInput).toBeRequired()
  expect(subjectInput).toBeRequired()
  expect(commentsInput).not.toBeRequired()
  await userEvent.click(screen.getByText('Submit'))
  expect(await screen.findByText('Something went wrong')).toBeInTheDocument()
})
