import { createApp } from 'vue'
import vm from 'virtual-module'
import App from './App.vue'

// 全局样式
import './index.css'

import router from './router/index'
import store from './store/index'

console.log(vm)
createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
