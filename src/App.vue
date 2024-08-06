<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, provide } from 'vue';
import NavigationBar from "@/components/navigationBar/NavigationBar.vue"
import TabBar from "@/components/tabBar/TabBar.vue"

const pageTitle = ref('상단 메뉴바');
provide('pageTitle', pageTitle);
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
