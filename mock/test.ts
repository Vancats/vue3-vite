/*
 * @Author: Lqf
 * @Date: 2022-02-25 15:07:26
 * @LastEditors: Lqf
 * @LastEditTime: 2022-02-25 15:08:36
 * @Description: 我添加了修改
 */

export default [
  {
    url: '/api-dev/users',
    method: 'get',
    response: req => {
      return {
        code: 0,
        data: [{ name: 'Rose' }, { name: 'Jack' }]
      }
    }
  }
]