import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
  },
  test: {
    environment: 'jsdom',
    setupFiles: path.resolve(__dirname, 'setupTests.ts'),
    globals: true,
  },
})
