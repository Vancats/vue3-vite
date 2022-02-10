<!--
 * @Author: Lqf
 * @Date: 2021-11-11 13:52:40
 * @LastEditors: Lqf
 * @LastEditTime: 2021-11-11 14:01:01
 * @Description: 我添加了修改
-->
<template>
  <component :is="comp"></component>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from '../lrouter/index'

let router = useRouter()
console.log('router: ', router)

const comp = computed(() => {
  const route = router.routes.find(route => route.path === router.current.value)
  return route ? route.component : null
})

</script>
