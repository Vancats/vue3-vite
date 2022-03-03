<!--
 * @Author: Lqf
 * @Date: 2022-02-25 10:38:50
 * @LastEditors: Lqf
 * @LastEditTime: 2022-03-03 10:55:17
 * @Description: 我添加了修改
-->

<script setup lang="ts">
import { reactive } from 'vue'
import { defineProps } from 'vue'
import appModule from '../styles/App.module.less'

defineProps({
  msg: {
    type: String,
    default: ''
  }
})

// webServer & mock
fetch('/api/users')
  .then(res => res.json())
  .then(users => console.log(users))
fetch('/api-dev/users')
  .then(res => res.json())
  .then(users => console.log(users))

// TS 支持
type Course = {
  id: number
  name: string
}
const courses = reactive<Course[]>([{ id: 1, name: '' }])
</script>

<template>
  <h1>{{ msg }}</h1>
  <!-- css module -->
  <div :class="$style.logo" />
  <div :class="appModule.logo" />
  <!-- autoprefixer -->
  <input type="text" placeholder="输入用户名" />
</template>

<style lang="less" scoped module>
.logo {
  width: 20px;
  height: 20px;
  background-image: url(@/assets/logo.png);
  background-size: contain;
}

// autoprefixer
::placeholder {
  color: red;
}
</style>
