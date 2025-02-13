
<template>
  <el-container>
    <el-header>
      <home-header></home-header>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <home-aside></home-aside>
      </el-aside>
      <el-main>
        <home-breadcrumb></home-breadcrumb>
        <home-main></home-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import HomeHeader from './components/Header.vue';
import HomeAside from './components/Aside.vue';
import HomeBreadcrumb from './components/Breadcrumb.vue';
import HomeMain from './components/Main.vue';
defineComponent({
  name: 'HomeView'
})
</script>

<style scoped lang="scss">
.el-header {
  box-shadow: 0 8px 24px -2px rgb(0 0 0 / 5%);
}

.el-aside {
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
}

.el-main {
  background: #f0f2f5;
  display: flex;
  flex-direction: column;
}
</style>
