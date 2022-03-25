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
