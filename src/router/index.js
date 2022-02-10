/*
 * @Author: Lqf
 * @Date: 2021-10-27 16:16:42
 * @LastEditors: Lqf
 * @LastEditTime: 2021-11-11 14:06:58
 * @Description: 我添加了修改
 */
import { createRouter, createWebHashHistory } from "vue-router"
// import { createRouter, createWebHashHistory } from "../lrouter/index"
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router