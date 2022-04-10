<script setup>
import { ref } from 'vue'
import TodoList from '@/components/TodoList/index.vue'
import Rate from '@/components/Rate/index.vue'
import JsxTodo from '@/components/JsxTodo/index.jsx'

const score = ref(3)
// function getScore (num) { score.value = num }
</script>

<template>
  <h1>这是关于页面</h1>
  <todo-list />
  <rate v-model="score" theme="red">
    <img width="10" src="/favicon.ico" />
  </rate>
  <jsx-todo />
  <!-- <rate :value="count" theme="red" @update-rate="getScore" /> -->
</template>
