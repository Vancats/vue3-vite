<!--
 * @Author: Lqf
 * @Date: 2021-10-27 17:00:21
 * @LastEditors: Lqf
 * @LastEditTime: 2021-10-29 14:56:07
 * @Description: 我添加了修改
-->
<template>
  <img src="./assets/logo.png" alt="" />
  <div>
    {{ title }}
  </div>
</template>

<script>
import { ref } from "vue"
export default {
  setup () {
    const title = ref("hello, kvite!")
    setInterval(() => {
      title.value = title.value.split("").reverse().join("")
    }, 1000)
    return { title }
  },
};
</script>
