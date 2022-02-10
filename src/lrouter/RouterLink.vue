<!--
 * @Author: Lqf
 * @Date: 2021-11-11 13:52:48
 * @LastEditors: Lqf
 * @LastEditTime: 2021-11-11 13:53:55
 * @Description: 我添加了修改
-->
<template>
  <a :href="'#' + props.to">
    <slot />
  </a>
</template>

<script setup>
let props = defineProps({
  to: { type: String, required: true }
})
</script>