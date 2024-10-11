<script setup>
import { getTime } from '../utils';
import { computed } from 'vue'

const props = defineProps({
    weatherInfo: {
        type: [Object, null],
        required: true,
    }
});

const timeZone = computed(() => {
    return props.weatherInfo?.city.timezone;
});

const sunRise = computed(() => {
    return getTime(props.weatherInfo?.city.sunrise + timeZone.value);
});

const sunSet = computed(() => {
    return getTime(props.weatherInfo?.city.sunset + timeZone.value);
});
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col text-block city">
                City: {{ weatherInfo?.city.name }}, {{ weatherInfo?.city.country }}
            </div>
        </div>
        <div class="row">
            <div class="col text-block tempetature">
                {{ Math.round(weatherInfo?.list[0].main?.temp) }} °C
            </div>
            <div class="col skyImg"
                :style="`background-image: url('/weather-main/${weatherInfo?.list[0].weather[0].description}.png')`">
            </div>
            <div class="empty"></div>
        </div>
        <div class="row">
            <div class="col text-block">
                Feels like: {{ Math.round(weatherInfo?.list[0].main?.feels_like) }} °C
            </div>
        </div>
        <div class="row">
            <div class="col text-block">
                Sunrise: {{ sunRise }}
            </div>
            <div class="col text-block">
                Sunset: {{ sunSet }}
            </div>
            <div class="empty"></div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
}

.row {
    display: flex;
}

.col {
    flex: 1;
}

.empty {
    flex: 0.5;
}

.skyImg {
    width: 75px;
    height: 75px;
    margin: 5px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
}

.text-block {
    position: relative;
    padding-left: 24px;
    padding-bottom: 8px;
    font-size: 20px;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 20px;
        height: 20px;
        margin-right: 6px;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-size: contain;
    }
}

.city {
    padding-top: 20px;
}

.tempetature {
    font-size: 40px;
    font-weight: 500;
    padding-left: 20px;
    line-height: 80px;
}
</style>