import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'
import myExample from './plugins/vite-example'
import viteI18n from './plugins/vite-i18n'

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve('./src'),
      comps: resolve('./src/components'),
      utils: resolve('./src/utils')
    }
  },
  plugins: [vue(), viteMockServe({}), myExample(), viteI18n]
})

// "gitHooks": {
//   "pre-commit": "lint-staged",
//   "pre-push": "npm run test:unit"
// },
// "lint-staged": {
//   "*.{js,vue}": "eslint --fix"
// },
