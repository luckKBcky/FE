<script setup>
import HeadText from "@/components/text/HeadText.vue"
import TitleText from "@/components/text/TitleText.vue"
import { inject, ref, onMounted, nextTick } from 'vue';
import axios from 'axios';

const pageTitle = inject('pageTitle');
const userId = ref(5);
const data = ref([
    {
        "type" : "food",
        "name" : "식비",
        "card_title": "국민 나라사랑카드",
        "summary_card_benefit": "음식점, 편의점, 커피 전문점 5% 할인",
        "money_benefit": "연 26,646원의 혜택을 받을 수 있어요!",
        "img_url": "https://d1c5n4ri2guedi.cloudfront.net/card/2609/card_img/31241/2609card.png"
    },
    {
        "type" : "leisure",
        "name" : "여가",
        "card_title": "국민 여행카드",
        "summary_card_benefit": "영화관, 공연 할인 10%, 여행사 이용 5% 할인",
        "money_benefit": "연 13,154원의 혜택을 받을 수 있어요!",
        "img_url": "https://d1c5n4ri2guedi.cloudfront.net/card/2609/card_img/31241/2609card.png"
    },
    {
        "type" : "beauty",
        "name" : "미용",
        "card_title": "국민 스타일카드",
        "summary_card_benefit": "미용실, 피부관리실 7% 할인",
        "money_benefit": "연 9,961원의 혜택을 받을 수 있어요!",
        "img_url": "https://d1c5n4ri2guedi.cloudfront.net/card/2609/card_img/31241/2609card.png"
    }
]);

const comments = ref({
    "leisure" : "를 즐기는 당신을 위한 카드",
    "food" : "가 중요한 당신을 위한 카드",
    "etc" : "소비에 적합한 당신을 위한 카드",
    "allowance" : "을 받는 당신을 위한 카드",
    "clothing" : "에 관심이 많은 당신을 위한 카드",
    "dating": "를 즐기는 당신을 위한 카드",
    "savings" : "을 자주하는 당신을 위한 카드",
    "beauty": "에 관심 많은 당신을 위한 카드",
    "studies": "에 열정적인 당신을 위한 카드",
    "convenience": "를 즐기는 당신을 위한 카드"
});

onMounted(() => {
  pageTitle.value = '카드 추천';
  getData();
});

const getData = async() => {
    try {
        const response = await axios.get(`https://t1115.p.ssafy.io/ai/card/recommendation?user_id=${userId.value}`);
        data.value = response.data;
    } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
    }
}

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
                    <span :style="{color: '#2787CC'}">{{data[0].name}}</span>{{comments[data[0].type]}}
                </span>
            </div>
            <div class="white-content-box">
                <img class="card-img" :src="data[0]['img_url']" alt="">
                <div class="white-content-dsc-box">
                    <div class="dsc-title">{{ data[0]["card_title"] }}</div>
                    <div class="dsc-content">
                        {{ data[0]["summary_card_benefit"] }}
                    </div>
                    <div class="dsc-content">{{  data[0]["money_benefit"] }}</div>
                </div>
            </div>
        </div>
        <div class="card-container">
            <div class="white-title-box">
                <span class="summary-text">
                    <span :style="{color: '#F9D722'}">{{data[1].name}}</span>{{comments[data[1].type]}}
                </span>
            </div>
            <div class="white-content-box">
                <img class="card-img" :src="data[1]['img_url']" alt="">
                <div class="white-content-dsc-box">
                    <div class="dsc-title">{{ data[1]["card_title"] }}</div>
                    <div class="dsc-content">
                        {{ data[1]["summary_card_benefit"] }}
                    </div>
                    <div class="dsc-content">{{ data[1]["money_benefit"] }}</div>
                </div>
            </div>
        </div>
        <div class="card-container">
            <div class="white-title-box">
                <span class="summary-text">
                    <span :style="{color: '#21953B'}">{{data[2].name}}</span>{{comments[data[2].type]}}
                </span>
            </div>
            <div class="white-content-box">
                <img class="card-img" :src="data[2]['img_url']" alt="">
                <div class="white-content-dsc-box">
                    <div class="dsc-title">{{ data[2]["card_title"] }}</div>
                    <div class="dsc-content">
                        {{ data[2]["summary_card_benefit"] }}
                    </div>
                    <div class="dsc-content">{{ data[2]["money_benefit"] }}</div>
                </div>
            </div>
        </div>
        
    </main>
</template>

<style scoped>
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