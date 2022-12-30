import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const url = new URL('./src', import.meta.url);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(url)
    }
  }
})
