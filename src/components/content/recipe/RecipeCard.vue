<script setup lang="ts">

import FireIcon from "~/components/icons/FireIcon.vue";
import ClockIcon from "~/components/icons/ClockIcon.vue";
import PlateIcon from "~/components/icons/PlateIcon.vue";
import MapIcon from "~/components/icons/MapIcon.vue";
import ChatIcon from "~/components/icons/ChatIcon.vue";
import {useTimeFormat} from "#imports";

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
  <div class="w-full h-full bg-primary-light shadow-2xs/10 grid grid-cols-2 rounded-2xl hover:cursor-pointer">
    <div class="w-full h-full sm:h-48 md:h-64">
      <LazyNuxtImg :src="imgUrl" alt="Recipe image for {{ recipeName }}"
                   class="w-full h-full object-cover rounded-l-2xl"
                   loading="lazy"
                   placeholder/>
    </div>
    <div class="grid grid-cols-2 grid-rows-[auto_auto_1fr_auto_auto] gap-2 p-4 box">
      <div class="col-span-2 mb-1">
        <h3 class="text-xl font-bold text-primary flex items-center mb-1">{{ recipeName }}</h3>
        <p class="text-sm text-gray-600 line-clamp-2">{{ description }}</p>
      </div>
      <LazyClientOnly>
        <div class="flex flex-col items-start gap-2">
          <span class="text-xs text-gray-500">Difficulty</span>
          <p aria-labelledby="level" class="flex gap-1 items-center">
            <FireIcon id="level" v-for="fire in level" :key="`fire-${recipeName}-${fire}`"/>
          </p>
        </div>
      </LazyClientOnly>
      <div>
        <span class="text-xs text-gray-500">Time</span>
        <p class="flex gap-1 items-center text-xs text-primary">
          <ClockIcon/>
          {{ formatMinutesAsHoursAndMinutes(timeInMinutes) }}
        </p>
      </div>
      <p aria-labelledby="type" class="flex gap-1 items-center text-primary text-sm">
        <PlateIcon class="mt-2"/>
        {{ foodType }}
      </p>
      <p class="flex gap-1 items-center text-primary text-sm">
        <MapIcon/>
        {{ country }}
      </p>
      <div class="flex col-span-2 w-full justify-between">
        <p class="flex gap-1 items-center text-primary text-sm">
          <ChatIcon/>
          {{ comments }} Comments
        </p>
        <p class="flex gap-1 items-center text-primary text-xs">
          {{ hearts }} likes
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>