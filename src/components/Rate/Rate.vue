<template>
  <div :style="fontStyle">
    <!-- 插槽 -->
    <slot></slot>
    <div class="rate" @mouseout="mouseOut">
      <span v-for="num in 5" :key="num" @mouseover="mouseOver(num)">☆</span>
      <span class="hollow" :style="fontWidth">
        <span v-for="num in 5" :key="num" @click="onRate(num)" @mouseover="mouseOver(num)">★</span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

let props = defineProps({
  // 注意传参名称
  modelValue: {
    type: Number,
    default: 1
  },
  theme: {
    type: String,
    default: 'orange'
  }
})

// 主题颜色
const themeObj = {
  black: '#00',
  white: '#fff',
  red: '#f5222d',
  orange: '#fa541c',
  yellow: '#fadb14',
  green: '#73d13d',
  blue: '#40a9ff'
}
const fontStyle = computed(() => {
  return `color: ${themeObj[props.theme]}`
})

// 评分宽度
let width = ref(props.modelValue)
const fontWidth = computed(() => `width: ${width.value * 13.06}px`)

// 滑动显示评分宽度
function mouseOver(i) {
  width.value = i
}
function mouseOut() {
  width.value = props.modelValue
}

// 点击改变星级
let emits = defineEmits(['update:modelValue'])
function onRate(num) {
  emits('update:modelValue', num)
}
</script>

<style scoped>
.rate {
  position: relative;
  display: inline-block;
}

.rate > span.hollow {
  position: absolute;
  display: inline-block;
  top: 0;
  left: 0;
  width: 0;
  overflow: hidden;
}
</style>
