<template>
  <div class="status-wrapper">
    <img src="@/assets/images/403.png" alt="">
    <p>没有权限</p>
    <router-link to="/">
      <el-button type="primary">回到首页</el-button>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
defineComponent({
  name: '403View' 
})
</script>

<style scoped lang="scss">

</style>
