<!--
 * @Date: 2022-03-10 23:57:57
 * @Description:
 *  TS support
 *  i18n
-->
<template>
  <h1>{{ msg }}</h1>
  <!-- css module -->
  <div :class="$style.logo" />
  <div :class="appModule.logo" />
  <!-- autoprefixer -->
  <input type="text" placeholder="输入用户名" />

  <label>{{ t('language') }}</label>
  <select v-model="locale">
    <option value="en">en</option>
    <option value="zh">zh</option>
  </select>
  <p>{{ t('hello') }}</p>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import appModule from '../styles/App.module.less'
import { getCurrentInstance, computed, ref } from 'vue'
// import example from 'my-example'
// console.log('example: ', example)

defineProps({
  msg: {
    type: String,
    default: ''
  }
})

// webServer & mock
fetch('/api/users')
  .then(res => res.json())
  .then(users => console.log(users, 'webServer'))
fetch('/api-dev/users')
  .then(res => res.json())
  .then(users => console.log(users, 'mock'))

// TS 支持
type Course = {
  id: number
  name: string
}
const courses = reactive<Course[]>([{ id: 1, name: '' }])

// i18n
const ins: any = getCurrentInstance()

function useI18n() {
  const locale = ref('zh')
  // 获取资源信息
  const i18n = ins.type.i18n
  const t = msg => {
    return computed(() => i18n[locale.value][msg]).value
  }
  return { locale, t }
}

const { locale, t } = useI18n()
</script>

<style lang="less" scoped module>
.logo {
  width: 20px;
  height: 20px;
  background-image: url(@/assets/logo.png);
  background-size: contain;
}

// autoprefixer
::placeholder {
  color: red;
}
</style>

<i18n>
{
  "en": {
    "language": "Language",
    "hello": "hello, world"
  },
  "zh": {
    "language": "语言",
    "hello": "你好，世界"
  }
}
</i18n>
