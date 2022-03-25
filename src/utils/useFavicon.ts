import { ref, watch } from 'vue'
export function useFavicon() {
  const favicon = ref('./favicon.icon')

  const updateIcon = icon => {
    document.head.querySelectorAll(`link[rel*="icon"]`).forEach((el: any) => (el.href = `${icon}`))
  }

  const reset = () => (favicon.value = './favicon.ico')

  watch(favicon, i => updateIcon(i))

  return {
    favicon,
    reset
  }
}
