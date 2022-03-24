const Koa = require('koa')
const fs = require('fs')
const path = require('path')
const compilerSFC = require('@vue/compiler-sfc')
const compilerDOM = require('@vue/compiler-dom')

const app = new Koa()

app.use(async ctx => {
  const { url, query } = ctx.request
  if (url === '/') {
    ctx.type = 'text/html'
    const filePath = path.resolve(__dirname, './index.html')
    const content = fs.readFileSync(filePath, 'utf-8')
    ctx.body = content
  } else if (url.endsWith('.js')) {
    // 响应 js 请求，解析出文件路径
    const filePath = path.join(__dirname, url)
    ctx.type = 'text/javascript'
    // 解析文件路径，
    const file = rewriteImport(fs.readFileSync(filePath, 'utf-8'))
    // 发送内容
    ctx.body = file
  } else if (url.startsWith('/@modules/')) {
    // 获取模块路径中 @modules 后面的部分
    const moduleName = url.replace('/@modules/', '')
    const prefix = path.join(__dirname, '../node_modules', moduleName)
    // 要加载文件的地址
    const module = require(prefix + '/package.json').module
    const filePath = path.join(prefix, module)
    // 加载出来的 js 代码
    const res = fs.readFileSync(filePath, 'utf-8')
    ctx.type = 'text/javascript'
    // 发送内容
    ctx.body = rewriteImport(res)
  } else if (url.indexOf('.vue') > -1) {
    // 读取 vue 文件内容
    const filePath = path.join(__dirname, url.split('?')[0])
    // compilerSFC 解析 SFC 文件，获得 AST
    const res = compilerSFC.parse(fs.readFileSync(filePath, 'utf-8'))
    console.log('res: ', res)

    if (!query.type) {
      // 获取脚本内容
      const scriptContent = res.descriptor.script.content
      console.log('scriptContent: ', scriptContent)
      // 转换默认导出配置对象为变量
      const script = scriptContent.replace('export default ', 'const __script = ')
      ctx.type = 'text/javascript'
      ctx.body = `
        ${rewriteImport(script)}
        // template 解析转换为另外一个请求
        import { render as __render} from '${url}?type=template'
        __script.render = __render
        export default __script
      `
    } else if (query.type && query.type === 'template') {
      const tpl = res.descriptor.template.content
      // 编译为 render 的一个模块
      const render = compilerDOM.compile(tpl, { mode: 'module' }).code
      ctx.type = 'text/javascript'
      ctx.body = rewriteImport(render)
    }
  } else if (url.endsWith('.png')) {
    ctx.body = fs.readFileSync('src' + url)
  }
})

function rewriteImport(content) {
  return content.replace(/ from ['"](.*)['"]/g, function (s0, s1) {
    // s0: 匹配的字符串 s1: 分组内容
    if (s1.startsWith('.') || s1.startsWith('./') || s1.startsWith('../')) {
      return s0
    } else {
      return ` from '/@modules/${s1}'`
    }
  })
}

app.listen(3001, () => {
  console.log('lvite start!')
})
