<!--
 * @Author: Lqf
 * @Date: 2021-10-28 18:52:50
 * @LastEditors: Lqf
 * @LastEditTime: 2021-11-05 15:23:21
 * @Description: 我添加了修改
-->
<template>
  <div>
    <router-link to="/">首页</router-link> |
    <router-link to="/about">关于</router-link>
  </div>
  <router-view></router-view>
  <!-- <router-view v-slot="{ Component }">
    <transition
      name="route"
      mode="out-in"
    >
      <component :is="Component" />
    </transition>
  </router-view> -->
</template>
