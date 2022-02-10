import { inject, reactive } from 'vue'

const STORE_KEY = '__store__'

function useStore () {
  return inject(STORE_KEY)
}

function createStore (options) {
  return new Store(options)
}

class Store {
  constructor(options) {
    this.$options = options
    this._state = reactive({
      data: typeof options.state === 'function' ? options.state() : options.state
    })
    this._mutations = options.mutations
    this._actions = options.actions
    this.getters = {}
    Object.keys(options.getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => {
          return options.getters[key](this.state)
        },
        enumerable: true
      })
    })
  }

  get state () {
    return this._state.data
  }

  commit = (type, payload) => {
    const entry = this._mutations[type]
    entry && entry(this.state, payload)
  }

  dispatch = (type, payload) => {
    const entry = this._actions[type]
    entry && entry(this, payload)
  }

  install (app) {
    app.provide(STORE_KEY, this)
  }
}

export { createStore, useStore }