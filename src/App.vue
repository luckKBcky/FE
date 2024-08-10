
<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, provide, onMounted } from 'vue';
import NavigationBar from "@/components/navigationBar/NavigationBar.vue"
import TabBar from "@/components/tabBar/TabBar.vue"

const pageTitle = ref('상단 메뉴바');
provide('pageTitle', pageTitle);

const checkMobileScreen = () => {
  const isMobile = window.innerWidth <= 768; // 모바일 화면 너비 기준을 768px로 설정
  if (!isMobile) {
    alert('이 앱은 모바일 화면에 최적화 되어있습니다. \n개발자도구를 통해 모바일로 접속 하시면 보다 편리한 환경을 사용하실 수 있습니다. ');
  }
};

onMounted(() => {
  checkMobileScreen();
});
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