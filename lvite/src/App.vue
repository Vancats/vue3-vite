<!--
 * @Author: Lqf
 * @Date: 2022-03-03 20:13:05
 * @LastEditors: Lqf
 * @LastEditTime: 2022-03-04 12:35:53
 * @Description: 我添加了修改
-->

<template>
  <div>{{ title }}</div>
  <img src="./assets/logo.png" alt="logo" />
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const title = ref('hello, lvite!')

    setInterval(() => {
      title.value = title.value.split('').reverse().join('')
    }, 500)

    return {
      title
    }
  }
}
</script>

<style lang="scss" scoped></style>
