<template>
  <div>
    <h1>TodoList</h1>
    <input v-model="text" type="text" @keydown.enter="addTodo" />
    <button v-if="active < all" @click="clear">清除</button>
    <ul v-if="todos.length">
      <li v-for="(todo, index) in todos" :key="index">
        <input v-model="todo.done" type="checkbox" />
        <span :class="{ done: todo.done }">{{ todo.text }}</span>
      </li>
    </ul>
    <div v-else>暂无数据</div>
    <div>
      全选
      <input v-model="allDone" type="checkbox" />
      <span>{{ all - active }} / {{ all }}</span>
    </div>
    {{ x }} -- {{ y }}
    <button @click="changeIcon">changeIcon</button>
    <button @click="reset">reset</button>
    <button @click="toggle">toggle</button>
  </div>
</template>

<script setup lang="ts">
import { useTodo } from './useTodo'
import { useMouse } from '../../utils/useMouse'
import { useFavicon } from '../../utils/useFavicon'
import { useFullscreen } from '@vueuse/core'

// 表单
let { text, todos, addTodo, clear, active, all, allDone } = useTodo()

// 鼠标事件 + 颜色转换
let { x, y, color } = useMouse()

// 页面图标事件
let { favicon, reset } = useFavicon()
function changeIcon() {
  favicon.value = './company.png'
}

// 全屏事件
const { isFullscreen, enter, exit, toggle } = useFullscreen()
</script>

<style scoped>
h1 {
  color: v-bind(color);
}
</style>
