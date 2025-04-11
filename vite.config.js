// vite.config.js
// import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/smartrecipe2/', // same as my repo name
  plugins: [react()],
});
