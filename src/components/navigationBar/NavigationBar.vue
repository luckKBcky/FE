<script setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';

const pageTitle = inject('pageTitle');
const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>

<template>
  <div class="nav-bar-container">
    <div class="back-button" @click="goBack">
        <font-awesome-icon :icon="['fas', 'chevron-left']" style="color: #ffffff;" />
    </div>
    <div class="page-title">
      {{ pageTitle }}
    </div>
    <div class="placeholder"></div> <!-- 오른쪽 여백을 위한 플레이스홀더 -->
  </div>
</template>

<style scoped>
.nav-bar-container {
  background-color: #64635E;
  width: 100%;
  height: 60px; /* 높이를 조금 늘렸습니다 */
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  position: relative;
}

.back-button {
  padding-left: 15px;
  font-size: 20px;
  cursor: pointer;
}

.page-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-weight: bold;
  font-size: 18px; /* 글자 크기를 늘립니다 */
}

.placeholder {
  width: 20px; /* 뒤로가기 버튼과 비슷한 크기의 여백 */
}
</style>