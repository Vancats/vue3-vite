/*
 * @Author: Lqf
 * @Date: 2021-10-28 19:03:22
 * @LastEditors: Lqf
 * @LastEditTime: 2021-10-28 19:07:16
 * @Description: 我添加了修改
 */

import HelloWorld from "@/components/HelloWorld.vue";
import { shallowMount } from "@vue/test-utils";

describe("aaa", () => {
  test("should ", () => {
    const wrapper = shallowMount(HelloWorld, {
      props: {
        msg: "hello,vue3",
      },
    });
    expect(wrapper.text()).toMatch("hello,vue3");
  });
});
