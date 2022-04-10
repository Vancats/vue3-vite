import { computed, ref } from 'vue'
import { useStorage } from '../../utils/useStorage'
export function useTodo() {
  const text = ref('')
  const todos = useStorage('todos', '[]')

  function addTodo() {
    todos.value.push({ text: text.value, done: false })
    text.value = ''
  }

  function clear() {
    todos.value = todos.value.filter((todo: any) => !todo.done)
  }

  const active = computed(() => {
    return todos.value.filter((todo: any) => !todo.done).length
  })

  const all = computed(() => todos.value.length)

  const allDone = computed({
    get() {
      return active.value === 0
    },
    set(val: boolean) {
      todos.value.forEach((todo: any) => {
        todo.done = val
      })
    },
  })

  return { text, todos, addTodo, clear, active, all, allDone }
}
