<script setup lang="ts">

import {useTimeFormat} from "#imports";

const timeFormat = useTimeFormat();

defineProps<{
  imgUrl: string,
  description: string,
  time: number,
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
      <div class="absolute bottom-0 left-0 w-full z-1 bg-primary-light/95 select-text grid grid-cols-[1fr_4rem] box-border"
           v-show="activeSlide">
        <div class="p-3">
          <p>{{ description }}</p>
        </div>
        <div class="h-full w-full flex items-end justify-end ">
         <div class="flex items-center justify-center p-1">
           <p class="scale-80">
             <IconsClockIcon/>
           </p>
           <span class="text-xs text-gray-500">{{ timeFormat.formatMinutesAsHoursAndMinutes(time) }}</span>
         </div>
        </div>
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