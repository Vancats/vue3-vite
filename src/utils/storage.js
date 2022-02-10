/*
 * @Author: Lqf
 * @Date: 2021-11-01 10:23:57
 * @LastEditors: Lqf
 * @LastEditTime: 2021-11-01 10:45:10
 * @Description: 本地存储
 */
import { ref, watchEffect } from 'vue'

export default function useStorage (name, value = []) {
  let data = ref(JSON.parse(localStorage.getItem(name)) || value)
  watchEffect(() => { localStorage.setItem(name, JSON.stringify(data.value)) })
  return data
}