const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const compilerSfc = require('@vue/compiler-sfc')
const compilerDom = require('@vue/compiler-dom')

const app = new Koa()

// 处理返回用户的首页
app.use(async ctx => {
  const { url, query } = ctx.request
  if (url === '/') {
    // 首页
    ctx.type = 'text/html'
    // ctx.body = fs.readFileSync('./index.html', 'utf-8')

    const p = path.join(__dirname, './index.html')
    // mock process
    const content = fs.readFileSync(p, 'utf8').replace(
      '<script type="module" src="/src/main.js"></script>',
      `<script>
        window.process = { env: { NODE_ENV: 'dev' } }
      </script>
      <script type="module" src="/src/main.js"></script>
      `)
    ctx.body = content
  }
  else if (url.endsWith('.js')) {
    // 响应js请求
    const p = path.join(__dirname, url)
    ctx.type = 'text/javascript'
    const file = rewriteImport(fs.readFileSync(p, 'utf-8'))
    ctx.body = file
  }
  else if (url.startsWith('/@modules/')) {
    // 获取@modules后面部分，模块名称
    // 查找依赖模块
    const moduleName = url.replace('/@modules/', '')
    const prefix = path.join(__dirname, '../node_modules', moduleName)
    // 读取package.json，要加载文件的地址
    const module = require(`${prefix}/package.json`).module
    const filePath = path.join(prefix, module)
    const ret = fs.readFileSync(filePath, 'utf-8')
    ctx.type = 'text/javascript'
    ctx.body = rewriteImport(ret)
  }
  else if (url.includes('.vue')) {
    // 解析SFC，处理内部script
    // 1. 读取vue文件内容,去除查询参
    const p = path.join(__dirname, url.split('?')[0])
    // 2. 解析SFC，获得ast
    const ret = compilerSfc.parse(fs.readFileSync(p, 'utf-8'))

    // 没有query.type，说明是SFC
    if (!query.type) {
      // 获取脚本内容
      const srciptContent = ret.descriptor.script.content
      // 转换默认导出配置对象为常量
      const script = srciptContent.replace(
        'export default ',
        'const __script = ',
      )
      ctx.type = 'text/javascript'
      ctx.body = `
        ${rewriteImport(script)}
        // template解析变为另外一个请求单独做
        import {render as __render} from '${url}?type=template'
        __script.render = __render
        export default __script
        `
    }
    else if (query.type === 'template') {
      const tpl = ret.descriptor.template.content
      // 编译为包含render的文件    前面为渲染函数，取出代码code
      const render = compilerDom.compile(tpl, { mode: 'module' }).code
      ctx.type = 'text/javascript'
      ctx.body = rewriteImport(render)
    }
  }
  else if (url.endsWith('.png')) {
    ctx.body = fs.readFileSync(`src${url}`)
  }
})

// 重写导入 变成相对地址
function rewriteImport(content) {
  return content.replace(/ from ['"](.*)['"]/g, (s0, s1) => {
    // s0匹配字符串，s1分组内容
    if (s1.startsWith('/') || s1.startsWith('./') || s1.startsWith('../'))
      return s0

    else
      return ` from '/@modules/${s1}'`
  })
}

app.listen(3001, () => {
  console.log('lvite start!')
})
