<template>
  <hello-world msg="Hello Vue3" />
  <todo-list />
  <rate-star />
</template>

<script setup lang="ts">
import HelloWorld from 'comps/HelloWorld/index.vue'
import TodoList from 'comps/TodoList/index.vue'
import RateStar from 'comps/Rate/index.vue'
</script>

<style lang="less" scoped></style>
