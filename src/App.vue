<script setup>
import { ref, computed, } from 'vue';
import Main from "./components/MainTab.vue";
import Favorite from "./components/FavoriteTab.vue";

const currentTab = ref("Main");

const tabComponentName = {
  Main: Main,
  Favorite: Favorite,
};

const currentTabComponent = computed(() => tabComponentName[currentTab.value]);
</script>

<template>
  <div class="app">
    <div class="title">Weather App by Honcharuk Oleksii</div>

    <div class="tabs">
        <button :class="{ active: currentTab === 'Main' }" @click="currentTab = 'Main'">
          Main
        </button>
        <button :class="{ active: currentTab === 'Favorite' }" @click="currentTab = 'Favorite'">
          Favorite
        </button>
    </div>
    <div class="contentTab">
      <component :is="currentTabComponent"></component>
    </div>
  </div>
</template>

<style scoped>
</style>
