<script setup lang="ts">

import {useTimeFormat} from "#imports";
import RightArrow from "~/components/icons/RightArrow.vue";
import ClockIcon from "~/components/icons/ClockIcon.vue";
import CaretIcon from "~/components/icons/CaretIcon.vue";

const timeFormat = useTimeFormat();

defineProps<{
  imgUrl: string,
  description: string,
  time: number,
  activeSlide: boolean,
  likes: number
}>();
</script>

<template>
  <div class="w-full h-full rounded-lg  hover:opacity-80">
    <img :src="imgUrl"
         alt=""
         class="object-cover w-full h-88 rounded-lg">
    <!--    Overlay image-->
    <div class="absolute inset-0 bg-amber-900/15 z-0 rounded-lg"/>
    <!-- Gradient overlay for readability -->
    <div class="absolute bottom-0 left-0 right-0 h-2/5 w-full z-5 pointer-events-none"
         style="background: linear-gradient(180deg, rgba(248,248,248,0) 0%, rgba(51,51,51,0.7) 100%);"/>
    <!--    Overlay Information  -->
    <Transition name="fade">
      <div class="absolute bottom-0 left-0 right-0 z-10 p-4 flex flex-col text-white " v-show="activeSlide">
        <p class="text-sm mb-2 truncate drop-shadow">{{ description }}</p>
        <div class="text-sm flex gap-4">
          <span class="inline-flex items-center gap-0.5">
            <ClockIcon fill="white"/>
            {{ timeFormat.formatMinutesAsHoursAndMinutes(time) }}
          </span>
          <span class="inline-flex items-center gap-1">
            <CaretIcon stroke="white"/>
            {{ likes }}
          </span>
        </div>
        <div class="flex w-full justify-end">
          <span
              class="inline-flex items-center bg-primary-dark/80  text-xs font-medium rounded-full px-2 py-1 shadow-lg">
            View Recipe
            <RightArrow/>
          </span>
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