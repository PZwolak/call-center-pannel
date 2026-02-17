import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@ThemeComponents': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@ThemeComposables': fileURLToPath(new URL('./src/composables', import.meta.url)),
      '@ThemeStores': fileURLToPath(new URL('./src/stores', import.meta.url)),
      '@ThemeTypes': fileURLToPath(new URL('./src/js/types', import.meta.url)),
    },
  },
})
