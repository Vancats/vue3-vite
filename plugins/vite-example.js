/*
 * @Author: Lqf
 * @Date: 2022-03-03 17:01:35
 * @LastEditors: Lqf
 * @LastEditTime: 2022-03-03 17:48:29
 * @Description: 我添加了修改
 */

export default function (options) {
  return {
    name: 'example',
    resolveId(source) {
      if (source === 'my-example') {
        // 表示接管
        return source
      }
      // 不接管
      return null
    },
    load(id) {
      if (id === 'my-example') {
        return `export default "this is my example"`
      }
      return null
    }
  }
}
