import { screen, render } from '@testing-library/react'
import { TextField } from './TextField'

test('render as input', () => {
  render(<TextField data-testid='text' as='text' />)
  expect(screen.getByRole('textbox')).toBeInTheDocument()
})

test('render as textarea', () => {
  render(<TextField data-testid='textarea' as='textarea' />)
  expect(screen.getByTestId('textarea')).toBeInTheDocument()
})
