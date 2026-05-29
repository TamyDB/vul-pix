import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/vul-pix/',
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 8080,
    host: true,
  }
})
