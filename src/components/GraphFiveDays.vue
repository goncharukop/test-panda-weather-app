<script setup>
import { onMounted, ref, computed, onUpdated } from 'vue';
import Highcharts from 'highcharts';
import accessibility from 'highcharts/modules/accessibility';

accessibility(Highcharts);

const props = defineProps({
    index: {
        type: [Number, 0],
        required: true,
    },
    weatherInfo: {
        type: [Object, null],
        required: true,
    }
});


const id = computed(() => { 
  return new Date().getTime() + props.index;
});

const chart = ref(null);

const getFiveDaysTimeArray = computed(() => {
  const array = [];
  let time;
  for (let i = 0; i < 40; i += 8) {
    time = String(new Date(props.weatherInfo?.list[i].dt * 1000)).substring(4,10)
    
    array.push(time)
  }

  return array;
})

const getMaxTemperatureArray = computed(() => {
  const array = [];
  
  for (let i = 0; i < 40; i += 8) {
    let maxTemp = -100;
    for (let j = 0; j < 8; j++ ) {
      const maxTempNow = props.weatherInfo?.list[i + j].main.temp_max;
      maxTemp = maxTemp < maxTempNow 
        ? maxTempNow
        : maxTemp;
    }
    array.push(maxTemp)
  }
  return array;
});

const getMinTemperatureArray = computed(() => {
  const array = [];
  
  for (let i = 0; i < 40; i += 8) {
    let minTemp = 100;
    for (let j = 0; j < 8; j++ ) {
      const minTempNow = props.weatherInfo?.list[i + j].main.temp_min;
      minTemp = minTemp > minTempNow
        ? minTempNow
        : minTemp;
    }
    array.push(minTemp)
  }
  return array;
})

const createGraph = () => {
  const timeArray = getFiveDaysTimeArray.value;
  const maxTemperatureArray = getMaxTemperatureArray.value;
  const minTemperatureArray = getMinTemperatureArray.value;

  chart.value = Highcharts.chart((id.value + ''), {
    chart: {
        backgroundColor: {
            linearGradient: [500, 500, 0, 0],
            stops: [
                [0, '#7874b1'],
                [1, '#adbfca']
            ]
        },
        type: 'line'
    },
    title: {
      text: 'Weather graph for 5 days',
      style: {
        color: '#000000',
        fontWeight: 500
      }
    },
    plotOptions: {
        series: {
            color: 'white',
            marker: {
                fillColor: '#2da9fc',
                lineWidth: 3,
            }
        }
    },
    xAxis: {
      categories: timeArray,
      title: {
        text: 'Date',
        style: {
          color: '#000000',
          fontWeight: 500
        }
      },
      labels: {
        style: {
          color: '#ffffff'
        }
      }
    },
    yAxis: {
      title: {
        text: 'Temperature (°C)',
        style: {
          color: '#000000',
          fontWeight: 500
        }
      },
      labels: {
        style: {
          color: '#ffffff'
        }
      }
    },
    series: [
      {
        name: 'min',
        data: minTemperatureArray
      },
      {
        name: 'max',
        data: maxTemperatureArray
      }
    ],
    credits:{
      enabled: false
    },
    legend: {
        enabled: true
    }
  });
}

onMounted(createGraph);
onUpdated(createGraph);
</script>

<template>
  <div v-if="weatherInfo?.list" class="graph" :id="`${id}`"></div>
</template>

<style scoped>
.graph {
  width: 100%;
  height: 250px;
}
</style>