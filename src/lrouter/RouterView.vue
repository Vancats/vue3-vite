<script setup>
import { computed } from 'vue'
import { useRouter } from '../lrouter/index'

const router = useRouter()
console.log('router: ', router)

const comp = computed(() => {
  const route = router.routes.find(route => route.path === router.current.value)
  return route ? route.component : null
})

</script>

<template>
  <component :is="comp" />
</template>
