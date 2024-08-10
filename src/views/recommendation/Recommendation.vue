<script setup>
import HeadText from "@/components/text/HeadText.vue"
import TitleText from "@/components/text/TitleText.vue"
import { inject, ref, onMounted, nextTick } from 'vue';

const pageTitle = inject('pageTitle');
onMounted(() => {
  pageTitle.value = '카드 추천';
});

</script>

<template>
    <main>
        <div class="title-container">
            <HeadText header-text="이주혁" />
            <div>님의 소비습관에 맞는 카드</div> 
        </div>
        <div class="card-container">
            <div class="white-title-box">
                <span class="summary-text">
                    <span :style="{color: '#2787CC'}">배달</span>을 자주 이용하는 당신을 위한 카드
                </span>
            </div>
            <div class="white-content-box">
                <img class="card-img" src="https://d1c5n4ri2guedi.cloudfront.net/card/2609/card_img/31241/2609card.png" alt="">
                <div class="white-content-dsc-box">
                    <div class="dsc-title">쿠팡 와우 카드</div>
                    <div class="dsc-content">
                        쿠팡, 쿠팡이츠, 쿠팡플레이 
                        2% 쿠팡캐시 적립
                    </div>
                    <div class="dsc-content">연 <b>9,700원</b>의 혜택을 받을 수 있어요!</div>
                </div>
            </div>
        </div>
        <div class="card-container">
            <div class="white-title-box">
                <span class="summary-text">
                    <span :style="{color: '#F9D722'}">편의점</span>을 자주 이용하는 당신을 위한 카드
                </span>
            </div>
            <div class="white-content-box">
                <img class="card-img" src="https://d1c5n4ri2guedi.cloudfront.net/card/2609/card_img/31241/2609card.png" alt="">
                <div class="white-content-dsc-box">
                    <div class="dsc-title">WE:SH Daily 카드</div>
                    <div class="dsc-content">
                        쿠팡, 쿠팡이츠, 쿠팡플레이 
                        2% 쿠팡캐시 적립
                    </div>
                    <div class="dsc-content">연 <b>9,700원</b>의 혜택을 받을 수 있어요!</div>
                </div>
            </div>
        </div>
        <div class="card-container">
            <div class="white-title-box">
                <span class="summary-text">
                    <span :style="{color: '#21953B'}">해외여행</span>을 즐기는 당신을 위한 카드
                </span>
            </div>
            <div class="white-content-box">
                <img class="card-img" src="https://d1c5n4ri2guedi.cloudfront.net/card/2609/card_img/31241/2609card.png" alt="">
                <div class="white-content-dsc-box">
                    <div class="dsc-title">트래블러스 체크카드</div>
                    <div class="dsc-content">
                        쿠팡, 쿠팡이츠, 쿠팡플레이 
                        2% 쿠팡캐시 적립
                    </div>
                    <div class="dsc-content">연 <b>9,700원</b>의 혜택을 받을 수 있어요!</div>
                </div>
            </div>
        </div>
        
    </main>
</template>

<style>
main {
    background-color: #F6F7F8;
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 20px;
}

.title-container {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.title-container > div {
    font-size: 18px;
}

.card-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.white-title-box {
    display: inline-block;
    width: 100%;
    border-radius: 5px;
    padding: 5px 20px;
    background-color: white;
    box-shadow: 0 0px 10px rgba(0,0,0,0.05), 0 0px 10px rgba(0,0,0,0.05);
    text-align: center;
}

.white-content-box {
    display: inline-block;
    width: 100%;
    border-radius: 5px;
    padding: 20px 20px;
    background-color: white;
    box-shadow: 0 0px 10px rgba(0,0,0,0.05), 0 0px 10px rgba(0,0,0,0.05);
    display: flex;
    flex-direction: row;
    gap: 30px;
}

.white-content-dsc-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}


.summary-text, .summary-text > span {
    font-weight: 900;
    font-size: 13px;
}

.card-img {
    width: 100px;
}

.dsc-title {
    font-size: 15px;
    font-weight: 800;
}

.dsc-content {
    font-size: 14px;
}

b {
    font-weight: bold;
}
</style>