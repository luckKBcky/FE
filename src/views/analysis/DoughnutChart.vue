<script setup>
import { reactive, onMounted, ref, watch } from 'vue';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ChartDeferred from 'chartjs-plugin-deferred';


const props = defineProps({
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "300px",
  },
  data: {
    type: Array,
    default: [],
  },
  sum: {
    type: Number,
    default: 0,
  }
});

const labels = ref([]);
const money = ref([]); 
const chartRef = ref(null);
let chart = null;

Chart.register(...registerables);
Chart.register(ChartDataLabels);
Chart.register(ChartDeferred);


const chartData = reactive({
  labels: labels,
  datasets: [
    {
      backgroundColor: ['#E24D79', '#FB9D56', '#B2D131', '#0BA9BF', '#B972EF',  
                        '#DF597B', '#FDB661', '#A0B619', '#70CEE1', '#849AA9',],
      data: money,
      borderWidth: 0
    }
  ]
}); 

const chartOptions = reactive({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
        datalabels: {
            color: '#ffffff',
            formatter: function(value, context) {
                if(value == 0) return '';
                return formatNumber(value/props.sum)+'%';
            },
        },
        legend: {
            position: 'right',
            labels: {
                usePointStyle: true,
                boxHeight: 6
            }
        },
        deferred: {
          xOffset: 150,   // defer until 150px of the canvas width are inside the viewport
          yOffset: '50%', // defer until 50% of the canvas height are inside the viewport
          delay: 500      // delay of 500 ms after the canvas is considered inside the viewport
        }
    }, 
})

function drawChart() {
    if (chart !== null) {
        chart.destroy();
    }
    const ctx = chartRef.value.getContext("2d");
    chart = new Chart(ctx, {
        type: "doughnut",
        data: chartData,
        options: chartOptions
    });
}

onMounted(async() => {
  labels.value = extractNames(props.data);
  money.value = extractAmounts(props.data);
  drawChart();
});

function extractNames(data) {
  return data.map(item => item.name);
}

function extractAmounts(data) {
  return data.map(item => item.amount);
}

const formatNumber = (value) => {
  const formattedValue = parseFloat(value).toFixed(2);
  return formattedValue.endsWith(".00")
    ? parseInt(formattedValue)
    : formattedValue;
};

watch(() => props.data, (oldValue, newValue) => {
  labels.value = extractNames(props.data);
  money.value = extractAmounts(props.data);
  drawChart();
},{ deep: true }); 

</script>

<template>
    <div :style="{width:width, height:height}">
      <canvas ref="chartRef"> </canvas>
    </div>
</template>

<style scoped></style>