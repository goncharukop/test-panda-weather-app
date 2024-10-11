<script setup>
import { ref, onMounted } from 'vue';
import WeatherInCity from "./WeatherInCity.vue";
import Graph from "./GraphOneDay.vue";
import GraphFiveDays from "./GraphFiveDays.vue";
import CloseButton from "./CloseButton.vue";
import { useWeather } from '../utils/useWeather';

const { 
  searchCity, weatherInfo, isLoading, filteredCities, weatherArray, favoriteArray, dialogVisible,
  getCustomerCity, fetchCities, getWeather, updateWeatherArray, updateFavoriteArray, showListDialog, showDialog, hideDialog 
} = useWeather();

const filterCities = () => {
  fetchCities(searchCity.value);
};

const currentTab = ref("Day");
const currentListTab = ref("Day0");

onMounted(getCustomerCity);
</script>

<template>
  <div v-if="isLoading" class="loader"></div>
  <div v-else class="container">
    <div  class="container">
      <section class="inputSection">
        <div>
          <input
            id="inputMain"
            type="text"
            placeholder="Enter city" 
            v-model="searchCity" 
            @input="filterCities" 
            @keyup.enter="() => { 
                getWeather(); 
                searchCity = '';
            }"
          />
        </div>
      </section>
        
      <ul
        v-if="searchCity.length >= 3"
        onclick="this.style.display='none'"
      >
        <li 
          v-for="(city, index) in  filteredCities" 
          :key="index"
          @click="() => { searchCity = city.name; getWeather(); }"
        >
          {{ city?.name }}, {{ city?.country }}
        </li>
      </ul>
    </div>
    <section>
      <div v-if="!weatherInfo?.list" class="">
        City not found
      </div>
    </section>

    <section class="section">
      <div class="tabs">
        <button :class="{ active: currentTab === 'Day' }" @click="currentTab = 'Day'">
          Day
        </button>
        
        <button :class="{ active: currentTab === 'FiveDays' }" @click="currentTab = 'FiveDays'">
          5 Days
        </button>
      </div>

      <WeatherInCity v-if="weatherInfo?.list" :weatherInfo="weatherInfo" />

      <div v-if="currentTab === 'Day'" class="contentTab">
        <Graph v-if="weatherInfo?.list" :weatherInfo="weatherInfo" :index="2" />
      </div>
      <div v-if="currentTab === 'FiveDays'" class="contentTab">
        <GraphFiveDays v-if="weatherInfo?.list" :weatherInfo="weatherInfo" :index="3" />
      </div>
    </section>

    <button 
      v-if="weatherInfo?.list"
      class="btn addBtn" 
      @click="() => { updateWeatherArray(weatherInfo); showListDialog(); }"
    >
      Add to List
    </button>

    <button
      class="btn favorite"
      @click="() => { updateFavoriteArray(weatherInfo); showDialog(); }"
    >
      Add to Favorite
    </button>

    <div v-if="dialogVisible" class="cover-div"></div>
    <div v-if="dialogVisible" class="modal-div">
      <button @click="hideDialog">X</button>
      <p class="text content">To add new remove the city … the maximum is 5</p>
    </div>
    
    <ul v-if="weatherArray.length > 0">
      <div class="title">List of weather in cities</div>
      <li 
        v-for="(cityWeather, index) in weatherArray" 
        :key="index"
      >
        <section class="section">
          <CloseButton :weatherArray="weatherArray" :index="index" />

          <div class="tabs">
            <button :class="{ active: currentListTab === `Day${index}` }" @click="currentListTab = `Day${index}`">
              Day
            </button>
            
            <button :class="{ active: currentListTab === `FiveDays${index}` }" @click="currentListTab = `FiveDays${index}`">
              5 Days
            </button>
          </div>

          <WeatherInCity v-if="weatherInfo?.list" :weatherInfo="cityWeather" />
          
          <div v-if="currentListTab === `Day${index}`" class="contentTab">
            <Graph v-if="weatherInfo?.list" :weatherInfo="cityWeather" :index="6 + index" />
          </div>
          <div v-if="currentListTab === `FiveDays${index}`" class="contentTab">
            <GraphFiveDays v-if="weatherInfo?.list" :weatherInfo="cityWeather" :index="7 + index" />
          </div>
        </section>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.inputSection {
  display: flex;
  justify-content: center;
  align-items: center;
}

#inputMain {
  margin: 15px;
  text-align: center;
}

.text {
  margin: 20px;
}

.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #7874b1;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
