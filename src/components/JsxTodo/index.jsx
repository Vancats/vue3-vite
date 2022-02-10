import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup(props) {
    let title = ref('')
    let todos = ref([{title: '学习Vue3', done: true}, {title: '睡觉', done: false}])

    function addTodo() {
      todos.value.push({
        title: title.value,
        done: false
      })
      title.value = ''
    }
    return () => <div>
      <input type="text" vModel={title.value} onKeydown={e => e.code === 'Enter' && addTodo()} />
      <button onClick={addTodo}>click</button>
      <ul>
        {
          todos.value.length ? todos.value.map(todo => <li>{todo.title}</li>) : <li>no data</li>
        }
      </ul>
    </div>
  }
})