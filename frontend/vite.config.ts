import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: ".",  // ⛔ prevents Vite from escaping the folder
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
})
