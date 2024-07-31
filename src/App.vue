<script setup>
import { RouterLink, RouterView } from 'vue-router'

import NavigationBar from "@/components/navigationBar/NavigationBar.vue"
import TabBar from "@/components/tabBar/TabBar.vue"
</script>

<template>
  <div class="container">
    <NavigationBar/>
    <RouterView/>
    <TabBar/>
  </div>
</template>

<style scoped>
@import "@/assets/reset.css";

.container {
  width: 100%;
  height: 100%;
}

</style>
