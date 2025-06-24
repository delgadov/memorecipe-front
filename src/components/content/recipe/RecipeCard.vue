<script setup lang="ts">

import FireIcon from "~/components/icons/FireIcon.vue";
import ClockIcon from "~/components/icons/ClockIcon.vue";
import PlateIcon from "~/components/icons/PlateIcon.vue";
import MapIcon from "~/components/icons/MapIcon.vue";
import ChatIcon from "~/components/icons/ChatIcon.vue";
import FavoriteButton from "~/components/header/FavoriteButton.vue";

const formatMinutesAsHoursAndMinutes = (minutes: number): string => {
  const hours = Math.floor((minutes / 60));

  if (hours == 0) {
    return minutes + "m";
  }

  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return hours + "h";
  }

  return hours + "hr " + remainingMinutes + "min";
}

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

</script>

<template>
  <div class="w-full h-full bg-primary-light shadow-2xs/10 grid grid-cols-2 rounded-2xl">
    <div class="w-full h-full sm:h-48 md:h-64">
      <LazyNuxtImg :src="imgUrl" alt="Recipe image for {{ recipeName }}"
                   class="w-full h-full object-cover rounded-l-2xl"
                   loading="lazy"
                   placeholder/>
    </div>
    <div class="grid grid-rows-[auto_auto_1fr_auto_auto] gap-2 p-4">
      <h3 class="text-xl font-bold text-primary col-span-2 flex items-center">{{ recipeName }}</h3>
      <LazyClientOnly>
      <span aria-labelledby="level" class="flex gap-1 items-center">
        <FireIcon id="level" v-for="fire in level" :key="`fire-${recipeName}-${fire}`"/>
      </span>
      </LazyClientOnly>
      <p aria-labelledby="type" class="flex gap-1 items-center text-primary text-sm">
        <PlateIcon class="mt-2"/>
        {{ foodType }}
      </p>
      <p class="flex gap-1 items-center text-sm text-primary">
        <ClockIcon/>
        {{ formatMinutesAsHoursAndMinutes(timeInMinutes) }}
      </p>
      <p class="flex gap-1 items-center text-primary text-sm">
        <MapIcon/>
        {{ country }}
      </p>
      <p class="flex gap-1 items-center text-primary text-sm">
        <ChatIcon/>
        {{ comments }} Comments
      </p>
      <p class="flex gap-1 items-center text-primary text-sm">
        <FavoriteButton/>
        {{ hearts }} likes
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>