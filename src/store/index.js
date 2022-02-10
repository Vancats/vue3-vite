/*
 * @Author: Lqf
 * @Date: 2021-11-08 10:30:01
 * @LastEditors: Lqf
 * @LastEditTime: 2021-11-08 14:37:11
 * @Description: 我添加了修改
 */
// import { createStore } from './lvuex.js'
import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      nub: 888
    }
  },
  getters: {
    doubleNub (state) {
      return state.nub * 2
    }
  },
  mutations: {
    addNub (state) {
      state.nub++
    }
  },
  actions: {
    asyncAdd ({ commit }) {
      setTimeout(() => {
        commit('addNub')
      }, 1000)
    }
  }
})

export default store