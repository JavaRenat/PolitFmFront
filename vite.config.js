import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  build: {
    outDir: './docs'
  },
  base: './',
  server: {
    proxy: {
      '/backend': {
        target: 'http://94.156.35.132:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/backend/, ''),
        secure: false
      }
    }
  }
})
