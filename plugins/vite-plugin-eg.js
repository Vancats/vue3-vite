export default function () {
  return {
    name: 'vite-plugin-eg',
    // 是否处理当前请求
    resolveId(source) {
      if (source === 'virtual-module')
        return source // 表示接管

      return null
    },
    // 进行加载
    load(id) {
      if (id === 'virtual-module')
        return 'export default "This is virtual!"'

      return null
    },
  }
}
