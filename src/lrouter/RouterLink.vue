<script setup>
const props = defineProps({
  to: { type: String, required: true },
})
</script>

<template>
  <a :href="'#' + props.to">
    <slot />
  </a>
</template>
