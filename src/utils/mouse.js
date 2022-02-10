/*
 * @Author: Lqf
 * @Date: 2021-10-29 10:15:51
 * @LastEditors: Lqf
 * @LastEditTime: 2021-11-01 10:46:09
 * @Description: 鼠标事件
 */
import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse () {
  const x = ref(0)
  const y = ref(0)

  function update (e) {
    x.value = e.pageX
    y.value = e.pageY
  }

  onMounted(() => {
    document.addEventListener('mousemove', update)
  })

  onUnmounted(() => {
    document.removeEventListener('mousemove', update)
  })
  return { x, y }
}