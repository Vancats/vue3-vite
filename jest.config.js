/*
 * @Author: Lqf
 * @Date: 2022-02-25 15:42:02
 * @LastEditors: Lqf
 * @LastEditTime: 2022-03-03 10:12:18
 * @Description: 我添加了修改
 */

module.exports = {
  transform: {
    //  用 `vue-jest` 处理 `*.vue` 文件
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.jsx?$': 'babel-jest', // Adding this line solved the issue
    '^.+\\.tsx?$': 'ts-jest'
  },
  // support alias
  moduleNameMapper: {
    '^@/components(.*)$': '<rootDir>/src/components$1'
  },
  testMatch: ['**/tests/unit/**/*.[jt]s?(x)']
}
