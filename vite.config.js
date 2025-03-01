import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    "api": 'http://lochalhost:6000',
  },
  plugins: [react()],


})
