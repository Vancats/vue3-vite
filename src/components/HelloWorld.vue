<script setup lang="ts">
import { computed, getCurrentInstance, reactive, ref } from 'vue'
import { useFullscreen } from '@vueuse/core'
import { useStore } from 'vuex'
import useFavicon from '../utils/favicon'
// import { useStore } from '../store/lvuex'
/**
 * @一
 * @description: module style使用 配合 classes.logo
 */
import classes from '../styles/App.module.css'

defineProps({
  msg: String,
})

/**
 * @二
 * @description: css v-bind
 */
const state = reactive({ count: 0 })
const color = ref('red')
function add() {
  state.count++
  color.value = Math.random() < 0.5 ? 'red' : 'blue'
}

/**
 * @三
 * @description: proxy请求代理
 * @description: mock请求
 */
fetch('/api/users')
  .then(res => res.json())
  .then(users => console.log(users))
fetch('/api-dev/users')
  .then(res => res.json())
  .then(users => console.log(users))

/**
 * @四
 * @description: typescript支持
 */
interface Course {
  id: number
  name: string
}
const courses = reactive<Course[]>([
  { id: 1, name: 'lqf' },
  { id: 2, name: 'hello' },
])

/**
 * @五
 * @description: 国际化
 */
// 国际化
// 1. 获取组件实例
const ins: any = getCurrentInstance()
// 2. 产生t函数和locale变量
function useI18n() {
  const locale = ref('zh')
  // 获取资源信息
  const i18n = ins.type.i18n
  const t = (msg: string) => {
    return computed(() => i18n[locale.value][msg]).value
  }
  return { locale, t }
}
const { locale, t } = useI18n()

/**
 * @六
 * @description: change favicon
 */
const { favicon, reset } = useFavicon()

function loading() {
  favicon.value = '/loading.gif'
  setTimeout(() => {
    reset()
  }, 2000)
}

/**
 * @七
 * @description: VueUse
 */
const { isFullscreen, enter, exit, toggle } = useFullscreen()

/**
 * @八
 * @description: store
 */
const store = useStore()
const nub = computed(() => store.state.nub)
const doubleNub = computed(() => store.getters.doubleNub)

function addNub() {
  store.commit('addNub')
}
function asyncAddNub() {
  store.dispatch('asyncAdd')
}
</script>

<template>
  <p>{{ msg }}</p>
  <span>{{ state.count }}</span>
  <button type="button" @click="add">add</button>

  <div style="display: flex; justify-content: center">
    <div :class="classes.logo" />
    <div :class="$style.logo" />
    <a href>color</a>
  </div>
  <input type="text" placeholder="请输入" />
  <li v-for="(c, i) in courses" :key="i" style="list-style: none">{{ c.name }}</li>

  <label>{{ t('language') }}</label>
  <select v-model="locale">
    <option value="en">en</option>
    <option value="zh">zh</option>
  </select>
  <p>{{ t('hello') }}</p>

  <button @click="loading">change favicon</button>
  <button @click="toggle">change fullscreen</button>asyncAddNub
  <button @click="addNub">{{ nub }} - {{ doubleNub }}</button>
  <button @click="asyncAddNub">{{ nub }} - {{ doubleNub }}</button>
</template>

<i18n>
{
  "en": {
    "language": "Language",
    "hello": "hello, world!"
  },
  "zh": {
    "language": "语言",
    "hello": "你好，世界！"
  }
}
</i18n>

<!-- module style -->
<style module>
.logo {
  width: 30px;
  height: 30px;
  background-image: url(@/assets/logo.png);
  background-size: contain;
}
</style>
<!-- scss install后直接使用 -->
<style scoped lang="less">
@link-color: rgb(192, 183, 63);
a {
  color: @link-color;
}
::placeholder {
  color: blue;
}
span {
  color: v-bind(color);
}
</style>
