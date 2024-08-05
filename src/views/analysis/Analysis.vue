<script setup>
import HeadText from "@/components/text/HeadText.vue"
import TitleText from "@/components/text/TitleText.vue"
import DonughnutChart from "@/views/analysis/DoughnutChart.vue";

</script>

<template>
    <main>
        <HeadText header-text="이주혁님" />
        <div class="month-container">
            <TitleText title-text="7월"/>

        </div>
        <div class="amount-container">
            <HeadText header-text="1,234,567" color="#4E84F0"/>
            <TitleText title-text="원"/>
        </div>
        <div class="white-box chart-white-box">
            <TitleText title-text="7월 한달 간 다음과 같이 지출했어요."/>
            <div class="white-box-content">
                <DonughnutChart />
            </div>
        </div>
        <div class="white-box rank-white-box">
            <TitleText title-text="지출 어디에 한걸까요?"/>
            <div class="white-box-content white-box-content-card">
                <div class="card-box">
                    <div class="ranking-box">1위</div>
                    <div>
                        <HeadText header-text="주거"/>
                        <HeadText header-text="45만원"/>
                    </div>
                    <div class="percent-box">44.8%(1건)</div>
                </div>
                <div class="card-box">
                    <div class="ranking-box">1위</div>
                    <div>
                        <HeadText header-text="주거"/>
                        <HeadText header-text="45만원"/>
                    </div>
                    <div class="percent-box">44.8%(1건)</div>
                </div>
                <div class="card-box">
                    <div class="ranking-box">1위</div>
                    <div>
                        <HeadText header-text="주거"/>
                        <HeadText header-text="45만원"/>
                    </div>
                    <div class="percent-box">44.8%(1건)</div>
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
    gap: 10px;
    padding: 20px;
}
.month-container {
    display: flex;
    flex-direction: row;
    width: 300px;
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
    padding: 20px 0px;
    background-color: white;
    box-shadow: 0 0px 10px rgba(0,0,0,0.05), 0 0px 10px rgba(0,0,0,0.05);
}

.chart-white-box {
    padding-left: 20px;
    padding-right: 20px;
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
    width: 150px;
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