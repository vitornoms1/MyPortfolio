// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr' // 1. Importe o novo plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    svgr() // 2. Adicione o plugin à lista
  ],
})