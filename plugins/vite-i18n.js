/*
 * @Author: Lqf
 * @Date: 2022-03-03 18:07:37
 * @LastEditors: Lqf
 * @LastEditTime: 2022-03-03 18:25:31
 * @Description: 我添加了修改
 */
export default {
  transform(code, id) {
    if (/vue&type=i18n/.test(id)) {
      return `export default Comp => {
        Comp.i18n = ${code}
      }`
    }
    return null
  }
}
