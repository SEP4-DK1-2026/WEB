import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// Workaround for typing mismatch after swapping to TypeScript
const reactCompilerBabelOptions = {
  presets: [reactCompilerPreset()],
} as Parameters<typeof babel>[0]

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel(reactCompilerBabelOptions),
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    // Route /api calls to backend services during frontend development.
    proxy: {
      '/api': {
        target: process.env.VITE_API_PROXY_TARGET || 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
