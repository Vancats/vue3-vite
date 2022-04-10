<script setup lang="ts">
import { ref } from 'vue'
import RateStar from './Rate.vue'

const score = ref(3)
</script>

<template>
  <rate-star v-model="score" theme="yellow">
    <img width="14" src="/favicon.ico" />
  </rate-star>
</template>
<style scoped></style>
