# Vitest + Testing Library

```bash

```

Install VSCode extension
[https://marketplace.visualstudio.com/items?itemName=vitest.explorer](https://marketplace.visualstudio.com/items?itemName=vitest.explorer)

Install [vitest](https://vitest.dev/) for testing and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) to test React components.

```bash
npm add -D vitest @vitejs/plugin-react @vitest/coverage-v8 @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
# if you want to use HTML reporter
npm add -D @vitest/ui
```

```json
  "test": "vitest",
  "test:ci": "vitest run"
```

Add `coverage and html` to your `.gitignore`

```bash
coverage
html
```

Add `setupTests.ts` to setup test utilities and global functions/mocks, if you have any kind of providers please take a look at this [example](https://testing-library.com/docs/react-testing-library/setup#custom-render)

```typescript
// extend matchers
import '@testing-library/jest-dom/vitest'
```

Add `vitest.config.ts`

```typescript
/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    // specify where to find tests
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: 'src/helpers/setupTests.ts',
    // environment to mount DOM
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      // add this section if you are using an alias
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
```

Then you can add a test.

```typescript
// import assert methods
import { test, expect } from 'vitest'
// import testinglibrary for react
import { screen, render } from '@testing-library/react'
// import component
import { TextField } from './TextField'

// name your test
test('render as input', () => {
  // render component
  render(<TextField data-testid='text' as='text' />)
  // make an asert
  expect(screen.getByRole('textbox')).toBeInTheDocument()
})

```

## Mock functions

Sometimes you needs to mock some functions/libraries to make your component works.

```typescript
import { describe, test, expect, vi } from 'vitest'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Pagination } from './Pagination'

// mock function to make an assert
const mockPush = vi.fn()
// mock library that depends on other functionality
vi.mock('next/navigation', () => {
  return {
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
```
