<script setup>
import { useTodos } from './todos'
import { useMouse } from '@/utils/mouse'

const { title, active, all, allDone, todos, addTodo, clear, showModal, removeTodo, animate, beforeEnter, enter, afterEnter } = useTodos()
const { x, y } = useMouse()

</script>

<template>
  <div>
    <input v-model="title" type="text" @keydown.enter="addTodo" />
    <button v-if="active < all" @click="clear">清理</button>
    <ul v-if="todos.length">
      <transition-group name="flip-list" tag="ul">
        <li v-for="(todo, index) in todos" :key="todo.title" style="list-style: none">
          <input v-model="todo.done" type="checkbox" />
          <span :class="{ done: todo.done }">{{ todo.title }}</span>
          <span @click="removeTodo($event,index)">❌</span>
        </li>
      </transition-group>
    </ul>
    <div v-else>暂无数据</div>
    <div>
      全选
      <input v-model="allDone" type="checkbox" />
      <span>{{ active }} / {{ all }}</span>
    </div>
    {{ x }} {{ y }}
  </div>
  <transition name="modal">
    <div v-if="showModal" class="info-wrapper">
      <div class="info">请输入值</div>
    </div>
  </transition>
  <span class="dustbin">🗑</span>
  <div class="animate-wrap">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div v-show="animate.show" class="animate" x>📋</div>
    </transition>
  </div>
</template>

<style lang="less" scoped>
.done {
  text-decoration: line-through;
}
.info-wrapper {
  position: fixed;
  top: 0;
  left: 43vw;
  width: 200px;
}
.info {
  padding: 20px;
  color: white;
  background: #e2d0cf;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}
.flip-list-move {
  transition: transform 0.8s ease;
}
.flip-list-enter-active,
.flip-list-leave-active {
  transition: all 1s ease;
}
.flip-list-enter-from,
.flip-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.dustbin {
  position: fixed;
  right: 10px;
  top: 10px;
}
.animate-wrap .animate {
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 100;
  transition: all 0.5s linear;
}
</style>
