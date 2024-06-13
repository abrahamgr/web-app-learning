// extend matchers
import '@testing-library/jest-dom/vitest'
import { afterAll, beforeAll, afterEach } from 'vitest'
import { server } from '@/mocks/server'

vi.mock('server-only', () => {
  return {}
})

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'bypass',
  })
})

afterAll(() => {
  server.close()
})

afterEach(() => {
  server.resetHandlers()
})
