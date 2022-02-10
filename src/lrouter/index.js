/*
 * @Author: Lqf
 * @Date: 2021-11-10 18:37:53
 * @LastEditors: Lqf
 * @LastEditTime: 2021-11-11 13:59:21
 * @Description: 我添加了修改
 */
import { ref, inject } from 'vue'
import RouterLink from './RouterLink.vue'
import RouterView from './RouterView.vue'

const ROUTER_KEY = '__router__'

function useRouter () {
  return inject(ROUTER_KEY)
}

function createRouter (options) {
  return new Router(options)
}

function createWebHashHistory () {
  function bindEvents (fn) {
    window.addEventListener('hashchange', fn)
  }
  return {
    bindEvents,
    url: window.location.hash.slice(1) || '/'
  }
}

class Router {
  constructor(options) {
    this.history = options.history
    this.routes = options.routes
    this.current = ref(this.history.url)

    this.history.bindEvents(() => {
      this.current.value = window.location.hash.slice(1)
    })
  }

  install (app) {
    app.provide(ROUTER_KEY, this)
    app.component('router-link', RouterLink)
    app.component('router-view', RouterView)

  }
}

export { createRouter, useRouter, createWebHashHistory }