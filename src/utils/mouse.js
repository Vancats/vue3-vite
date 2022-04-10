import { onMounted, onUnmounted, ref } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function update(e) {
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
