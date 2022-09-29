import { resolve } from 'path' 
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {
      '/sapi': {
        target: 'http://127.0.0.1:9000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/sapi/, '')
      },
    }
  }
})
