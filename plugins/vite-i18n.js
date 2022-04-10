export default {
  transform(code, id) {
    if (/vue&type=i18n/.test(id)) {
      return `export default Comp => {
        Comp.i18n = ${code}
      }`
    }
    return null
  },
}

// Vite 按照以下顺序调用钩子
// config: 修改 Vite 配置
// configResolved: Vite 配置确认
// configureServer: 配置 devServer
// transformIndexHtml: 用于转换宿主页
// resolveId: 创建自定义确认函数，常用于定位第三方依赖
// load: 创建自定义加载函数，可用于返回自定义内容
// transform: 可用于转换已加载的模块内容
// handleHotUpdate: 自定义 HMR 更新时调用
