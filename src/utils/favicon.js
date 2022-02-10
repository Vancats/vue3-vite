/*
 * @Author: Lqf
 * @Date: 2021-11-01 10:52:32
 * @LastEditors: Lqf
 * @LastEditTime: 2021-11-01 10:56:30
 * @Description: 我添加了修改
 */

import { ref, watch } from 'vue'

export default function useFavicon (newIcon) {
  const favicon = ref(newIcon)

  const updateIcon = (icon) => {
    document.head.querySelectorAll(`link[rel*="icon"]`).forEach(el => el.href = `${icon}`)
  }

  const reset = () => favicon.value = '/favicon.ico'

  watch(favicon, (icon) => { updateIcon(icon) })

  return { favicon, reset }
}