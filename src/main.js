/*
 * @Author: Lqf
 * @Date: 2021-10-28 18:52:50
 * @LastEditors: Lqf
 * @LastEditTime: 2021-11-08 10:37:16
 * @Description: 我添加了修改
 */
import { createApp } from 'vue'
import App from './App.vue'

import vm from "virtual-module"

console.log(vm)

// 全局样式
import './index.css'

import router from './router/index'
import store from './store/index'
createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
