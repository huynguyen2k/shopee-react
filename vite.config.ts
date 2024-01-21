import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [react(), tsConfigPaths()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: '.vitest/setup-test',
    include: ['**/*.test.{ts,tsx}'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./src/styles/abstracts" as *;`,
      },
    },
  },
}))
