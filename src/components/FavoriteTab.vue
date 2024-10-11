<script setup>
import { ref } from 'vue';
import WeatherInCity from './WeatherInCity.vue';
import Graph from "./GraphOneDay.vue";
import GraphFiveDays from "./GraphFiveDays.vue";
import CloseButton from "./CloseButton.vue";

const favoriteArray = ref(JSON.parse(localStorage.getItem('favoriteArray')));

const currentFavoriteTab = ref("Day0");

</script>

<template>
  <div class="container "> 
    <ul v-if="favoriteArray">
      <div class="title">List of weather in favorite cities</div>
      <li 
        v-for="(cityWeather, index) in favoriteArray" 
        :key="index"
      >
        <section class="section">
          <CloseButton :weatherArray="favoriteArray" :index="index" />

          <div class="tabs">
            <button :class="{ active: currentFavoriteTab === `Day${index}` }" @click="currentFavoriteTab = `Day${index}`">
              Day
            </button>
            
            <button :class="{ active: currentFavoriteTab === `FiveDays${index}` }" @click="currentFavoriteTab = `FiveDays${index}`">
              5 Days
            </button>
          </div>
          <WeatherInCity :weatherInfo="cityWeather" />
          
          <div v-if="currentFavoriteTab === `Day${index}`" class="contentTab">
            <Graph :weatherInfo="cityWeather" :index="8 + index" />
          </div>
          <div v-if="currentFavoriteTab === `FiveDays${index}`" class="contentTab">
            <GraphFiveDays :weatherInfo="cityWeather" :index="9 + index" />
          </div>
        </section>
      </li>
    </ul>
    <p v-else >No items in Favorite. Add first on Main tab</p>
  </div>
</template>

<style scoped>
.title {
  position: relative;
  top: 0;
  left: 0;

}
</style>