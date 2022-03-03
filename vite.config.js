/*
 * @Author: Lqf
 * @Date: 2022-02-25 10:38:50
 * @LastEditors: Lqf
 * @LastEditTime: 2022-03-03 10:11:15
 * @Description: 我添加了修改
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { viteMockServe } from 'vite-plugin-mock'

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
  plugins: [vue(), viteMockServe({})]
})

// package.json
// 提交时跑eslint
// "gitHooks": {
//   "pre-commit": "lint-staged",
//   "pre-push": "npm run test:unit"
// },
// "lint-staged": {
//   "*.{js,vue}": "eslint --fix"
// },

// eslint依赖
// "@typescript-eslint/eslint-plugin": "^4.15.2",
// "@typescript-eslint/parser": "^4.15.2",
// "@vue/eslint-config-prettier": "^6.0.0",
// "@vue/eslint-config-typescript": "^7.0.0",
// "@vuedx/typescript-plugin-vue": "^0.6.3",
// "eslint": "^7.20.0",
// "eslint-plugin-prettier": "^3.3.1",
// "eslint-plugin-vue": "^7.6.0",
// "prettier": "^2.2.1"

// jest依赖
// "jest": "^26.6.3",
// "@types/jest": "^26.0.20",
// "vue-jest": "^5.0.0-alpha.7",
// "@babel/preset-env": "^7.12.17",
// "@babel/preset-typescript": "^7.12.17",
// "babel-jest": "^26.6.3",
// "ts-jest": "^26.5.1",
// "@vue/test-utils": "^2.0.0-beta.9",
