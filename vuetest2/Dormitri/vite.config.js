import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  rollupOptions: {
    input: {
      main: resolve(__dirname, '/src/App.vue'),
      home: resolve(__dirname, '/src/home/App.vue')
    }
  }
})
