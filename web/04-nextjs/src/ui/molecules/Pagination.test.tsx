import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Pagination } from './Pagination'

// mock function to make an assert
const mockPush = vi.fn()
// mock library that depends on other functionality
vi.mock('next/navigation', async () => {
  const actual =
    await vi.importActual<typeof import('next/navigation')>('next/navigation')
  return {
    ...actual,
    // defined imports used in component
    useRouter: () => ({
      // assign mocked function to function used
      push: mockPush,
    }),
  }
})

describe('pagination', () => {
  test('render', () => {
    render(<Pagination currentPage='1' lastPage='2' path='/' />)
    expect(screen.getByText('Prev')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
  })
  test('click on next', async () => {
    render(<Pagination currentPage='1' lastPage='2' path='/' />)
    await userEvent.click(screen.getByText('Next'))
    expect(mockPush).toBeCalledWith('/?page=2')
  })
  test('click on prev', async () => {
    render(<Pagination currentPage='2' lastPage='2' path='/' />)
    await userEvent.click(screen.getByText('Prev'))
    expect(mockPush).toBeCalledWith('/?page=1')
  })
})
