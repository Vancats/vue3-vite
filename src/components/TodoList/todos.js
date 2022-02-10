/*
 * @Author: Lqf
 * @Date: 2021-10-29 10:13:31
 * @LastEditors: Lqf
 * @LastEditTime: 2021-11-05 15:23:57
 * @Description: 我添加了修改
 */
import { ref, computed, reactive } from 'vue'
import useStorage from '../../utils/storage'

export function useTodos () {
  const title = ref('')
  const showModal = ref(false)

  const animate = reactive({
    show: false,
    el: null
  })

  const todos = useStorage('todos', [{ title: '学习', done: false }])

  function addTodo () {
    if (!title.value) {
      showModal.value = true
      setTimeout(() => {
        showModal.value = false
      }, 1500)
      return
    }
    todos.value.push({ title: title.value, done: false })
    title.value = ''
  }

  let active = computed(() => todos.value.filter((todo) => !todo.done).length)

  let all = computed(() => todos.value.length)

  function clear () {
    todos.value = todos.value.filter((todo) => !todo.done)
  }

  let allDone = computed({
    get: function () {
      return active.value === 0 && all.value !== 0
    },
    set: function (val) {
      todos.value.forEach((todo) => {
        todo.done = val
      })
    }
  })

  function removeTodo (e, i) {
    animate.el = e.target
    animate.show = true
    todos.value.splice(i, 1)
  }

  function beforeEnter (el) {
    let dom = animate.el
    let rect = dom.getBoundingClientRect()
    let x = window.innerHeight - rect.left - 60
    let y = rect.top - 10
    el.style.transform = `translate(-${x}px, ${y}px)`
  }

  function enter (el, done) {
    document.body.offsetHeight
    el.style.transform = `translate(0, 0)`
    el.addEventListener('transitionend', done)
  }

  function afterEnter (el) {
    animate.show = false
    el.style.display = 'none'
  }

  return { title, todos, clear, active, all, allDone, addTodo, showModal, removeTodo, animate, beforeEnter, enter, afterEnter }
}