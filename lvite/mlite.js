const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const compilerDOM = require('@vue/compiler-dom')
const compilerSFC = require('@vue/compiler-sfc')

const app = new Koa()

app.use(ctx => {
  const { url, query } = ctx
  if (url === '/') {
    ctx.type = 'text/html'
    // 文件路径
    const filePath = path.join(__dirname, './index.html')
    // 文件内容
    const content = fs.readFileSync(filePath, 'utf-8')
    // 返回
    ctx.body = content
  }
  else if (url.endsWith('.js')) {
    ctx.type = 'text/javascript'
    // 文件路径
    const filePath = path.join(__dirname, url)
    // 文件内容
    const content = rewriteImport(fs.readFileSync(filePath, 'utf-8'))
    // 返回
    ctx.body = content
  }
  else if (url.startsWith('/@modules/')) {
    ctx.type = 'text/javascript'
    // 转换回模块名称
    const moduleName = url.replace('/@modules/', '')
    // 该模块的文件夹路径
    const prefix = path.join(__dirname, '../node_modules', moduleName)
    // 该模块具体引入的文件相对路径
    const module = require(path.join(prefix, '/package.json')).module
    // 该模块具体引入的文件绝对路径
    const filePath = path.join(prefix, module)
    // 文件内容
    const content = rewriteImport(fs.readFileSync(filePath, 'utf-8'))
    // 返回
    ctx.body = content
  }
  else if (url.includes('.vue')) {
    ctx.type = 'text/javascript'
    // 文件路径
    const filePath = path.join(__dirname, url.split('?')[0])
    // compilerSFC 文件处理过的 AST 树
    const content = compilerSFC.parse(fs.readFileSync(filePath, 'utf-8'))
    if (!query.type) {
      // 如果是 .vue 文件
      // 获取其 script 的内容
      const scriptContent = content.descriptor.script.content
      // 默认导出修改为一个可赋值的对象
      const script = scriptContent.replace('export default ', 'const __script = ')
      ctx.body = `
        ${rewriteImport(script)}
        // template 内容解析转换交由另外一个对象处理
        import {render as __render} from '${url}?type=template'
        __script.render = __render
        export default __script
      `
    }
    else {
      // 这里是 vue 中的其他模块 如 template，style，i18n 等
      // 这里写的是 template 的转换
      const tpl = content.descriptor.template.content
      // 获取转换后的代码
      const res = compilerDOM.compile(tpl, { mode: 'module' }).code
      ctx.body = rewriteImport(res)
    }
  }
  else if (url.endsWith('.png')) {
    ctx.body = fs.readFileSync(`src${url}`)
  }
})

function rewriteImport(content) {
  return content.replace(/ from ['"](.*)['"]/g, (s0, s1) => {
    if (s1.startsWith('.') || s1.startsWith('/'))
      return s0

    else
      return ` from '/@modules/${s1}'`
  })
}

app.listen(3001, () => {
  console.log('start!!!')
})
