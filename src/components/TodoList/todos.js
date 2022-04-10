import { computed, reactive, ref } from 'vue'
import useStorage from '../../utils/storage'

export function useTodos() {
  const title = ref('')
  const showModal = ref(false)

  const animate = reactive({
    show: false,
    el: null,
  })

  const todos = useStorage('todos', [{ title: '学习', done: false }])

  function addTodo() {
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

  const active = computed(() => todos.value.filter((todo) => !todo.done).length)

  const all = computed(() => todos.value.length)

  function clear() {
    todos.value = todos.value.filter((todo) => !todo.done)
  }

  const allDone = computed({
    get() {
      return active.value === 0 && all.value !== 0
    },
    set(val) {
      todos.value.forEach((todo) => {
        todo.done = val
      })
    },
  })

  function removeTodo(e, i) {
    animate.el = e.target
    animate.show = true
    todos.value.splice(i, 1)
  }

  function beforeEnter(el) {
    const dom = animate.el
    const rect = dom.getBoundingClientRect()
    const x = window.innerHeight - rect.left - 60
    const y = rect.top - 10
    el.style.transform = `translate(-${x}px, ${y}px)`
  }

  function enter(el, done) {
    // eslint-disable-next-line no-unused-expressions
    document.body.offsetHeight
    el.style.transform = 'translate(0, 0)'
    el.addEventListener('transitionend', done)
  }

  function afterEnter(el) {
    animate.show = false
    el.style.display = 'none'
  }

  return { title, todos, clear, active, all, allDone, addTodo, showModal, removeTodo, animate, beforeEnter, enter, afterEnter }
}
