<template>
  <div>
    hello login
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store';
defineComponent({
  name: 'LoginView'
})

const store = useStore()

store.dispatch("users/login", {
  "email": "huangrong@gmail.com",
  "pass": "huangrong"
}).then(res => {
  console.log(res.data);
})

</script>

<style scoped lang="scss">

</style>
