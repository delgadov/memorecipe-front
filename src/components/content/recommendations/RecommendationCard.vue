<script setup lang="ts">

defineProps<{
  imgUrl: string,
  description: string,
  activeSlide: boolean,
}>();
</script>

<template>
  <div class="w-full h-full rounded-lg shadow-sm hover:opacity-80">
    <img :src="imgUrl"
         alt=""
         class="object-cover w-full h-88 rounded-lg ">
    <!--    Overlay image-->
    <div class="absolute inset-0 bg-amber-900/10 z-0 rounded-lg"/>
    <!--    Description  -->
    <Transition name="fade">
      <div class="absolute bottom-10 left-3.5 max-w-55 z-1 bg-primary-light/80 p-3 select-text" v-show="activeSlide">
        <p>{{ description }}</p>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>