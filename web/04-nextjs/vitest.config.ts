/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'
import path from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    setupFiles: 'src/helpers/setupTests.ts',
    environment: 'jsdom',
    coverage: {
      include: ['src/ui/**/*.{ts,tsx}'],
      exclude: [
        'src/helpers/setupTests.ts',
        'src/ui/pages',
        'src/ui/organisms/SignIn.tsx',
        'src/ui/organisms/SignUp.tsx',
      ],
      reporter: ['html', 'text-summary', 'json'],
      thresholds: {
        functions: 40,
        lines: 40,
        branches: 40,
        statements: 40,
      },
    },
  },
  resolve: {
    alias: {
      // add this section if you are using an alias
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
