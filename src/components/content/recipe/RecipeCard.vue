<script lang="ts" setup>

import FireIcon from "~/components/icons/FireIcon.vue";
import ClockIcon from "~/components/icons/ClockIcon.vue";
import PlateIcon from "~/components/icons/PlateIcon.vue";
import MapIcon from "~/components/icons/MapIcon.vue";
import ChatIcon from "~/components/icons/ChatIcon.vue";
import {useTimeFormat} from "#imports";
import RightArrow from "~/components/icons/RightArrow.vue";

defineProps<{
  imgUrl: string,
  recipeName: string,
  description: string,
  level: number,
  timeInMinutes: number,
  country: string,
  foodType: string,
  comments: number,
  hearts: number
}>();

const {formatMinutesAsHoursAndMinutes} = useTimeFormat();
const getDifficultyText = (level: number): string => {
  switch (level) {
    case 1:
      return "Easy";
    case 2:
      return "Medium";
    case 3:
      return "Hard";
    default:
      return "N/A";
  }
}
const getDifficultyColor = (level: number) => {
  switch (level) {
    case 1:
      return "text-green-600";
    case 2:
      return "text-yellow-600";
    case 3:
      return "text-red-600";
    default:
      return "black";
  }
}
</script>

<template>
  <div class="w-full h-full flex flex-col relative ">
    <!--    Image -->
    <div class="w-full h-64 md:h-96 z-0 rounded-tl-2xl rounded-br-2xl overflow-hidden">
      <LazyNuxtImg :src="imgUrl" alt="Recipe image for {{ recipeName }}"
                   class="w-full h-full object-cover "
                   loading="lazy"
                   placeholder/>
    </div>
    <!--    Overlay image-->
    <div class="absolute inset-0 bg-amber-900/15 z-1 rounded-tl-2xl rounded-br-2xl"/>
    <!-- Gradient overlay for readability -->
    <div class="absolute bottom-0 left-0 right-0 h-2/2 w-full z-2 pointer-events-none rounded-br-2xl"
         style="background: linear-gradient(180deg, rgba(248,248,248,0) 0%, rgba(51,51,51,0.7) 100%);"/>

    <!-- Difficulty Badge -->
    <div class="absolute top-2 left-3 px-3 py-1 rounded-full backdrop-blur-sm bg-primary-light/90">
      <p :class="[
        'text-xs font-bold',
        `${getDifficultyColor(level)}`]">{{ getDifficultyText(level) }}</p>
    </div>

    <!--    Overlay Information -->
    <div class="absolute left-0 bottom-0 right-0 z-3 p-4 text-white w-full flex flex-col gap-2">
      <p class="text-xl font-bold">{{ recipeName }}</p>
      <div class="text-xs flex flex-col gap-2">
        <p class="text-sm line-clamp-2 mb-1">{{ description }}</p>
        <div class="flex flex-wrap gap-4 items-center">
          <span class="inline-flex gap-1 items-center rounded-full py-1 px-2 bg-primary-light/20 backdrop-blur-sm">
            <ClockIcon class="w-3 h-3" fill="white"/> {{ formatMinutesAsHoursAndMinutes(timeInMinutes) }}
          </span>
          <span class="inline-flex gap-1 items-center rounded-full py-1 px-2 bg-primary-light/20 backdrop-blur-sm">
            <ChatIcon class="w-3 h-3" fill="white"/> {{ level }}
          </span>
        </div>
      </div>
      <div class="flex w-full justify-between">
        <div class="flex text-xs gap-4 items-center">
          <span class="inline-flex gap-1 items-center rounded-full py-1 px-2 bg-primary-light/20 backdrop-blur-sm">
            <PlateIcon class="w-3 h-3" fill="white"/> {{ foodType }}
          </span>
          <span class="inline-flex gap-1 items-center rounded-full py-1 px-2 bg-primary-light/20 backdrop-blur-sm">
            <MapIcon class="w-3 h-3" fill="white"/> {{ country }}
          </span>
        </div>
        <span
            class="inline-flex items-center bg-primary-dark/80 text-xs font-medium rounded-full px-2 py-1 shadow-lg
                      hover:opacity-80 hover:cursor-pointer">
            View Recipe
            <RightArrow/>
          </span>
      </div>
    </div>


  </div>
</template>

<style scoped>

</style>