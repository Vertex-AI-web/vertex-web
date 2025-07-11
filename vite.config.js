import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Cambia "vertex-web" por el nombre de tu repo si es distinto
export default defineConfig({
  base: '/vertex-web/', // O el nombre del repo
  plugins: [react()],
})