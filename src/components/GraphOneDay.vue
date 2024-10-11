<script setup>
import { onMounted, ref, computed, onUpdated } from 'vue';
import Highcharts from 'highcharts';
import accessibility from 'highcharts/modules/accessibility';
import { getTime } from '../utils';

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

const timeZone = computed(() => {
    return props.weatherInfo?.city.timezone;
})

const getTimeArray = computed(() => {
  const array = [];
  let time;
  for (let i = 0; i < 9; i++) {
    time = getTime(props.weatherInfo?.list[i].dt + timeZone.value - 10800).substring(0,5);
    array.push(time);
  }

  return array;
})

const getTemperatureArray = computed(() => {
  const array = [];
  for (let i = 0; i < 9; i++) {
    array.push(props.weatherInfo.list[i].main.temp)
  }

  return array;
})

const createGraph = () => {
  const timeArray = getTimeArray.value;
  const temperatureArray = getTemperatureArray.value;

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
      text: 'Weather graph',
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
        text: 'Hours',
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
        name: '',
        data: temperatureArray
      }
    ],
    credits:{
      enabled: false
    },
    legend: {
        enabled: false
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