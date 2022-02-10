/*
 * @Author: Lqf
 * @Date: 2021-10-28 17:03:17
 * @LastEditors: Lqf
 * @LastEditTime: 2021-10-28 17:06:06
 * @Description: 我添加了修改
 */
export default [
  {
    url: '/api-dev/users',
    method: 'get',
    response: req => {
      return {
        code: 0,
        data: [{name: 'tom'}, {name: 'jerry'}]
      }
    }
  }
]