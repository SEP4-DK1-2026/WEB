import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"



// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/testing/setupTests.ts",
  },
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
