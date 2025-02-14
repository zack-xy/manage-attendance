<template>
  <div>
    <div class="status-wrapper">
    <img src="@/assets/images/403.png" alt="">
    <p>没有找到</p>
    <router-link to="/">
      <el-button type="primary">回到首页</el-button>
    </router-link>
  </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
defineComponent({
  name: '404View'
})
</script>

<style scoped lang="scss">

</style>
