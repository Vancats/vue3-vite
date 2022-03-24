<!--
 * @Date: 2022-02-25 10:38:50
 * @LastEditTime: 2022-03-24 09:31:08
 * @Description: 我添加了修改
-->
<script setup>
import HelloWorld from 'comps/HelloWorld.vue'
</script>

<template>
  <router-link to="/">首页 |</router-link>

  <router-link to="/about">关于</router-link>
  <router-view></router-view>
</template>
