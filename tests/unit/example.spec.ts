/*
 * @Author: Lqf
 * @Date: 2022-02-25 15:43:43
 * @LastEditors: Lqf
 * @LastEditTime: 2022-02-25 15:53:26
 * @Description: 我添加了修改
 */

import HelloWorld from "@/components/HelloWorld.vue"
import { shallowMount } from "@vue/test-utils"

describe("aaa", () => {
  test("should ", () => {
    const wrapper = shallowMount(HelloWorld, {
      props: {
        msg: "Hello Vue3",
      },
    })
    expect(wrapper.text()).toMatch("Hello Vue3")
  })
})