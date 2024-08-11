<script setup>
import HeadText from "@/components/text/HeadText.vue"
import TitleText from "@/components/text/TitleText.vue"
import DonughnutChart from "@/views/analysis/DoughnutChart.vue";
import { inject, ref, onMounted, computed } from 'vue';
import axios from 'axios';

const pageTitle = inject('pageTitle');

const currentDate = new Date();
const month = ref(currentDate.getMonth() + 1); // 월 가져오기 (0부터 시작하므로 +1 해줘야 함)

const data = ref({
"leisure": {
"name": "여가",
"amount": 12650
},
"food": {
"name": "식비",
"amount": 10620
},
"etc": {
"name": "기타",
"amount": 4000
},
"allowance": {
"name": "용돈",
"amount": 0
},
"clothing": {
"name": "옷",
"amount": 0
},
"dating": {
"name": "데이트",
"amount": 0
},
"savings": {
"name": "저축",
"amount": 0
},
"beauty": {
"name": "미용",
"amount": 0
},
"studies": {
"name": "학업",
"amount": 0
},
"convenience": {
"name": "편의",
"amount": 0
}
});
const orderedItems = ref([]);
const array = ref([]);
const sum = ref(0)


onMounted(async () => {
    pageTitle.value = '거래 내역 분석';
    await getData();
});

const getData = async() => {
    // try {
    //     const response = await axios.get(`https://t1115.p.ssafy.io/ai/getJSON?month=${month.value}`);
    //     data.value = response.data;
    // } catch (error) {
    //     console.error('API 요청 중 오류 발생:', error);
    // }
    orderedItems.value = convertObjectToArray(data.value);
    console.log(orderedItems.value);
    sum.value = data.value.etc.amount + data.value.food.amount + data.value.leisure.amount 
                + data.value.beauty.amount + data.value.allowance.amount + data.value.clothing.amount
                + data.value.dating.amount + data.value.savings.amount + data.value.studies.amount + data.value.convenience.amount;
}

function convertObjectToArray(obj) {
  return Object.values(obj);
}

const formatNumber = (value) => {
  const formattedValue = parseFloat(value).toFixed(2);
  return formattedValue.endsWith(".00")
    ? parseInt(formattedValue)
    : formattedValue;
};

function formatNumberWithComma(number) {
  return number.toLocaleString();
}

async function nextMonth() {
    month.value = month.value + 1;
    await getData();
}

async function lastMonth() {
    month.value = month.value - 1;
    await getData();
}

</script>

<template>
    <main>
        <HeadText header-text="이주혁님" />
        <div class="month-container">
            <div class="month-button" @click="lastMonth">
                <font-awesome-icon :icon="['fas', 'caret-left']" style="color: #323232;" />
            </div>
            <TitleText :title-text="month+'월'"/>
            <div class="month-button" @click="nextMonth">
                <font-awesome-icon :icon="['fas', 'caret-right']" style="color: #323232;" />
            </div>
        </div>
        <div class="amount-container">
            <HeadText :header-text="formatNumberWithComma(sum)" color="#4E84F0"/>
            <TitleText title-text="원"/>
        </div>
        <div class="white-box chart-white-box">
            <TitleText :title-text="month + '월 한달 간 다음과 같이 지출했어요.'"/>
            <div class="white-box-content">
                <DonughnutChart :data="orderedItems" :sum="sum"/>
            </div>
        </div>
        <div class="white-box rank-white-box">
            <TitleText title-text="지출 어디에 한걸까요?"/>
            <div class="white-box-content white-box-content-card">
                <div class="card-box" v-for="(item, index) in orderedItems" :key="index" :style="{'background-color': index==0 ? '#E1EDFD' : '#F6F9F8'}">
                    <div class="ranking-box" :style="{'background-color': index==0 ? '#4483F7' : '#7F8591'}">{{index+1}}위</div>
                    <div>
                        <HeadText :header-text="item.name"/>
                        <HeadText :header-text="formatNumberWithComma(item.amount) + '원'"/>
                    </div>
                    <div class="percent-box">{{formatNumber(item.amount/sum * 100)}}%</div>
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
    gap: 5px;
    padding: 20px;
}
.month-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 300px;
    gap: 10px;
}

.month-button {
    font-size: 30px;
    cursor: pointer;
}

.amount-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
}

.white-box {
    display: inline-block;
    width: 100%;
    border-radius: 10px;
    margin: 5px 0px;
    padding: 20px 0px;
    background-color: white;
    box-shadow: 0 0px 10px rgba(0,0,0,0.05), 0 0px 10px rgba(0,0,0,0.05);
}

.chart-white-box {
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 0px;
}

.rank-white-box {
    padding-left: 20px;
}

.white-box-content {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
}

.white-box-content-card {
    gap: 10px;
    overflow: auto;
    scrollbar-width: none;
}
.white-box-content-card::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
}

.card-box {
    width: 170px;
    height: 200px;
    border-radius: 10px;
    padding: 10px 10px;
    background-color: #F6F9F8; /** E1EDFD */
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.ranking-box {
    width: 70px;
    text-align: center;
    background-color: #7F8591;
    color: white;
    border-radius: 50px;
}

.percent-box {
    color: #686A69;
    font-size: 14px;
    font-weight: 700;
}
</style>