<template>
  <div class="home-main">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
defineComponent({
  name: 'HomeMain'
})
</script>

<style scoped lang="scss">
.home-main {
    margin-top: 20px;
    background: #fff;
    flex-grow: 1;
    position: relative;
}
</style>
