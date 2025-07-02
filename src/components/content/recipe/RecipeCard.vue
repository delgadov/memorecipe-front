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

</script>

<template>
  <div class="w-full h-full flex flex-col relative ">
    <!--    Image -->
    <div class="w-full h-64 md:h-96 z-0">
      <LazyNuxtImg :src="imgUrl" alt="Recipe image for {{ recipeName }}"
                   class="w-full h-full object-cover rounded-tl-2xl rounded-br-2xl"
                   loading="lazy"
                   placeholder/>
    </div>
    <!--    Overlay image-->
    <div class="absolute inset-0 bg-amber-900/15 z-1 rounded-tl-2xl rounded-br-2xl"/>
    <!-- Gradient overlay for readability -->
    <div class="absolute bottom-0 left-0 right-0 h-2/2 w-full z-2 pointer-events-none rounded-br-2xl"
         style="background: linear-gradient(180deg, rgba(248,248,248,0) 0%, rgba(51,51,51,0.7) 100%);"/>
    <!--    Overlay Information -->
    <div class="absolute left-0 bottom-0 right-0 z-3 p-4 text-white w-full flex flex-col gap-2">
      <p class="text-xl font-bold">{{ recipeName }}</p>
      <div class="text-xs flex flex-col gap-2">
        <p class="drop-shadow-sm text-sm">{{ description }}</p>
        <span class="inline-flex gap-4 items-center">
          <span class="inline-flex gap-1 items-center">
            <FireIcon/> {{ level }}
          </span>
          <span class="inline-flex gap-1 items-center">
            <ClockIcon fill="white"/> {{ formatMinutesAsHoursAndMinutes(timeInMinutes) }}
          </span>
          <span class="inline-flex gap-1 items-center">
            <ChatIcon fill="white"/> {{ level }}
          </span>
        </span>
      </div>
      <div class="flex w-full justify-end">
          <span
              class="inline-flex items-center bg-primary-dark/80 text-xs font-medium rounded-full px-2 py-1 shadow-lg
                      hover:opacity-80 hover:cursor-pointer">
            View Recipe
            <RightArrow/>
          </span>
      </div>
    </div>

    <!--    <div class="grid grid-cols-2 grid-rows-[auto_auto_1fr_auto_auto] gap-2 p-4 box">-->
    <!--      <div class="col-span-2 mb-1">-->
    <!--        <h3 class="text-xl font-bold text-primary flex items-center mb-1">{{ recipeName }}</h3>-->
    <!--        <p class="text-sm text-gray-600 line-clamp-2">{{ description }}</p>-->
    <!--      </div>-->
    <!--      <LazyClientOnly>-->
    <!--        <div class="flex flex-col items-start gap-2">-->
    <!--          <span class="text-xs text-gray-500">Difficulty</span>-->
    <!--          <p aria-labelledby="level" class="flex gap-1 items-center">-->
    <!--            <FireIcon id="level" v-for="fire in level" :key="`fire-${recipeName}-${fire}`"/>-->
    <!--          </p>-->
    <!--        </div>-->
    <!--      </LazyClientOnly>-->
    <!--      <div>-->
    <!--        <span class="text-xs text-gray-500">Time</span>-->
    <!--        <p class="flex gap-1 items-center text-xs text-primary">-->
    <!--          <ClockIcon fill="black"/>-->
    <!--          {{ formatMinutesAsHoursAndMinutes(timeInMinutes) }}-->
    <!--        </p>-->
    <!--      </div>-->
    <!--      <p aria-labelledby="type" class="flex gap-1 items-center text-primary text-sm">-->
    <!--        <PlateIcon class="mt-2"/>-->
    <!--        {{ foodType }}-->
    <!--      </p>-->
    <!--      <p class="flex gap-1 items-center text-primary text-sm">-->
    <!--        <MapIcon/>-->
    <!--        {{ country }}-->
    <!--      </p>-->
    <!--      <div class="flex col-span-2 w-full justify-between">-->
    <!--        <p class="flex gap-1 items-center text-primary text-sm">-->
    <!--          <ChatIcon/>-->
    <!--          {{ comments }} Comments-->
    <!--        </p>-->
    <!--        <p class="flex gap-1 items-center text-primary text-xs">-->
    <!--          {{ hearts }} likes-->
    <!--        </p>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<style scoped>

</style>