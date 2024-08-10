<script setup>
import { useRouter } from 'vue-router'

// useRouter 훅을 사용하여 라우터 인스턴스를 가져옵니다
const router = useRouter()

// 각 클릭 이벤트에 따라 이동할 함수 정의
const goToChat = () => {
  router.push('/')
}

const goToChart = () => {
  router.push('/analysis')
}

const goToCard = () => {
  router.push('/recommendation')
}
</script>

<template>
    <div class="tab-bar-container">
      <img src="/chat.svg" alt="Chat Icon" @click="goToChat" />
      <img src="/chart.svg" alt="Chart Icon" @click="goToChart" />
      <img src="/card.svg" alt="Card Icon" @click="goToCard" />
    </div>
</template>
  

<style scoped>
.tab-bar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 30px;
}

.tab-bar-container img {
    cursor: pointer;
    transition: opacity 0.3s;
}
</style>