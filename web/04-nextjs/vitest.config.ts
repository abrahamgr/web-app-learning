/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import path from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: 'src/helpers/setupTests.ts',
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      // add this section if you are using an alias
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
