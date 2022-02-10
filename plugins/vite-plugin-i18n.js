/*
 * @Author: Lqf
 * @Date: 2021-10-28 19:36:44
 * @LastEditors: Lqf
 * @LastEditTime: 2021-10-28 20:02:45
 * @Description: 我添加了修改
 */
export default {
  // transform将load进来的模块进一步处理,code是块的内容,id是请求的url
  transform (code, id) {
    // 处理自定义块请求
    if (/vue&type=i18n/.test(id)) {
      // 相当于为组件添加了一个json
      return `export default Comp => {
        Comp.i18n = ${code}
      }`
    }
    return null
  }
}