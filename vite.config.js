import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/vertex-web/', // 👈 clave para que cargue en GitHub Pages
})
