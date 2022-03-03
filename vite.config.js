/*
 * @Author: Lqf
 * @Date: 2022-02-25 10:38:50
 * @LastEditors: Lqf
 * @LastEditTime: 2022-03-03 19:34:09
 * @Description: 我添加了修改
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { viteMockServe } from 'vite-plugin-mock'
import myExample from './plugins/vite-example'
import vitei18n from './plugins/vite-i18n'

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
      comps: resolve('./src/components')
    }
  },
  plugins: [vue(), viteMockServe({}), myExample(), vitei18n]
})

// "gitHooks": {
//   "pre-commit": "lint-staged",
//   "pre-push": "npm run test:unit"
// },
// "lint-staged": {
//   "*.{js,vue}": "eslint --fix"
// },
