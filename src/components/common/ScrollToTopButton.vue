<script setup lang="ts">
import UpArrowIcon from "~/components/icons/UpArrowIcon.vue";

const {scrollToTop, showScrollToTop } = useScrollToTop();
</script>

<template>
  <div class="w-min h-min fixed right-8 bottom-8 z-10" v-show="showScrollToTop">
    <button @click="scrollToTop()" class="bg-primary-dark rounded-full p-3 shadow-lg cursor-pointer hover:bg-primary" aria-label="Back to Top">
      <UpArrowIcon fill="white"/>
    </button>
  </div>
</template>

<style scoped>

</style>