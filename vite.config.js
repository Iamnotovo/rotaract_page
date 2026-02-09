import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so assets load correctly on GitHub Pages (username.github.io/repo/)
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  root: '.',
  base: './',
})
