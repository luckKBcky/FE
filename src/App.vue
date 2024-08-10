
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
    <NavigationBar class="nav"/>
    <RouterView class="view"/>
    <TabBar class="tab"/>
  </div>
</template>

<style scoped>
@import "@/assets/reset.css";

.container {
  display: flex;
  flex-direction: column; /* 수직으로 배치 */
  height: 100vh;
}

.container > * {
  flex-shrink: 0; /* 자식 요소가 줄어들지 않도록 설정 */
}

.nav {
  flex: 0 0 auto; /* 높이가 고정됨 */
}

.view {
  flex: 1; /* 남은 공간을 차지하도록 설정 */
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤이 생기도록 설정 */
}

.tab {
  flex: 0 0 auto; /* 높이가 고정됨 */
}
</style>
