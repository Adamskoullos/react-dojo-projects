<script setup lang="js">
  import {defineProps} from 'vue';
    const props = defineProps({
      image: {
        type: String,
        default: "logo.svg",
      },
      alt: {
        type: String,
        default: "planetary table",
      },
      title: {
        type: String,
        default: "Super Duper Planetary Table",
      },
    });

    const getImageUrl = (img) => {
      return new URL(`@/assets/${img}`, import.meta.url).href;
    };
</script>

<template>
  <div id="app-header">
    <img :alt="alt" :src="getImageUrl(image)" />
    <h1>{{ title }}</h1>
  </div>
</template>

<style>
  #app-header {
    padding-top: 2vh;
  }
  #app-header img {
    margin-bottom: 1.5rem;
  }
  #app-header h1 {
    font-size: 2rem;
    font-weight: 300;
  }
</style>
