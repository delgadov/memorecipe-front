<script lang="ts" setup>
import BaseModal from "~/components/common/BaseModal.vue";
import {useCountriesList, useTimeSlider} from "#imports";
import DropDownSelect from "~/components/common/DropDownSelect.vue";
import {useRoute, useRouter} from "#vue-router";
import FastWatch from "~/components/icons/FastWatch.vue";
import PanIcon from "~/components/icons/PanIcon.vue";
import ChefHatIcon from "~/components/icons/ChefHatIcon.vue";
import CakeMakerIcon from "~/components/icons/CakeMakerIcon.vue";
import SeedlingIcon from "~/components/icons/SeedlingIcon.vue";
import CarrotIcon from "~/components/icons/CarrotIcon.vue";
import GlutenFreeIcon from "~/components/icons/GlutenFreeIcon.vue";
import DairyFreeIcon from "~/components/icons/DairyFreeIcon.vue";
import {LOGICAL_OPERATORS} from "@babel/types";

let quick = 15;
let standard = 35;
let chef = 60;
let slow = 9999;
let DIET_VEGAN = "vegan";
let DIET_VEGETARIAN = "vegetarian";
let DIET_DAIRYFREE = "dairy_free";
let DIET_GLUTENFREE = "gluten_free";


const showFilter = ref<boolean>(false);

const countriesList = useCountriesList();
countriesList.unshift("Any");

const router = useRouter();
const route = useRoute();

const filters = ref({
  difficulty: route.query.difficulty?.toString(),
  country: route.query.country?.toString(),
  time: route.query.time?.toString(),
  dietary: Array.isArray(route.query.dietary) ? route.query.dietary : [],
});

const applyFilter = () => {
  const cleanArray = filters.value.dietary.filter(item => item && item.trim() !== "");
  router.push({
    query: {
      ...route.query,
      time: filters.value.time || undefined,
      country: filters.value.country || undefined,
      difficulty: filters.value.difficulty || undefined,
      dietary: cleanArray.length > 0 ? cleanArray.join(',') : undefined,
    }
  });
};

const clearFilters = () => {
  filters.value.difficulty = undefined;
  filters.value.country = undefined;
  filters.value.time = undefined;
  filters.value.dietary = [];

  applyFilter();
};

const setDietary = (dietary: string) => {
  if (!dietAlreadyInList(dietary)) {
    filters.value.dietary.push(dietary);
  } else {
    const index = filters.value.dietary.indexOf(dietary);
    if (index > -1) {
      filters.value.dietary.splice(index, 1);
    }
  }
}

const dietAlreadyInList = (value: string): boolean => {
  return filters.value.dietary.includes(value);
}

</script>

<template>
  <div class="">
    <button
        class="rounded-xl text-sm bg-primary-light w-full h-10 px-4 border-1 border-primary-dark shadow-sm cursor-pointer hover:bg-primary-medium transition-all duration-200"
        @click="showFilter = !showFilter">
      Filters
    </button>
    <BaseModal v-model:show-modal="showFilter" class="modal" modal-name="Refine Recipes">
      <!--
      Time
      Country
      Difficulty
      No-cook
      Ingredients
      Dietary type -> 	E.g., vegetarian, vegan, gluten-free, dairy-free, keto
      Meal type -> 	Breakfast, Lunch, Dinner, Snack, Dessert, etc.
      Cooking type -> Bake, Grill, Air Fry, Pressure Cook, Sous Vide
      Season -> Summer, Winter, Fall – helps with ingredient seasonality and user behavior
      Calories Range
      User
      -->
      <template #content>
        <!--        Preparation -->
        <section class="p-5 flex flex-col gap-3 w-full ">
          <label class="text-sl font-semibold text-primary" for="time-range">Preparation</label>
          <div class="w-full flex flex-col gap-3 text-gray-400 transition-all text-sm font-bold ">

            <ul class="list-none p-0 grid grid-cols-2 gap-3 text-[0.65rem] text-gray-400 transition-all duration-200 w-full">
              <li class="w-full">
                <input id="time-quick" v-model="filters.time" :value="quick" class="peer hidden-dot" name="time-prep"
                       type="radio">
                <label
                    class="grid grid-rows-[90%_10%] gap-1 place-items-center p-3 rounded-lg shadow-sm hover:cursor-pointer hover:bg-primary-medium h-30
                    peer-checked:bg-primary-dark/20 peer-checked:hover:bg-primary-dark/20"
                    for="time-quick">
                  <FastWatch class="max-h-full w-auto aspect-square"/>
                  <span>{{ quick }} Minutes</span>
                </label>
              </li>

              <li class="w-full">
                <input id="time-standard" v-model="filters.time" :value="standard" class="peer hidden-dot"
                       name="time-prepdard"
                       type="radio">
                <label
                    class="grid grid-rows-[90%_10%] gap-1 place-items-center p-3 rounded-lg shadow-sm hover:cursor-pointer hover:bg-primary-medium h-30
                    peer-checked:bg-primary-dark/20 peer-checked:hover:bg-primary-dark/20"
                    for="time-standard">
                  <PanIcon class="max-h-full w-auto aspect-square"/>
                  <span>{{ standard }} Minutes</span>
                </label>
              </li>

              <li class="w-full">
                <input id="time-chef" v-model="filters.time" :value="chef" class="peer hidden-dot" name="time-prep"
                       type="radio">
                <label
                    class="grid grid-rows-[90%_10%] gap-1 place-items-center p-3 rounded-lg shadow-sm hover:cursor-pointer hover:bg-primary-medium h-30
                    peer-checked:bg-primary-dark/20 peer-checked:hover:bg-primary-dark/20"
                    for="time-chef">
                  <ChefHatIcon class="max-h-full w-auto aspect-square"/>
                  <span>{{ chef }} Minutes</span>
                </label>
              </li>

              <li class="w-full">
                <input id="time-slow" v-model="filters.time" :value="slow" class="peer hidden-dot" name="time-prep"
                       type="radio">
                <label
                    class="grid grid-rows-[90%_10%] gap-1 place-items-center p-3 rounded-lg shadow-sm hover:cursor-pointer hover:bg-primary-medium h-30
                    peer-checked:bg-primary-dark/20 peer-checked:hover:bg-primary-dark/20"
                    for="time-slow">
                  <CakeMakerIcon class="max-h-full w-auto aspect-square"/>
                  <span>Hours</span>
                </label>
              </li>
            </ul>
          </div>
        </section>

        <!--        Dietary Type-->
        <section class="p-5 flex flex-col gap-3">
          <label class="text-sl font-semibold text-primary">Dietary Type</label>
          <div class="w-full grid grid-cols-2 gap-3 text-gray-400 transition-all text-sm font-bold">

            <button
                class="flex-1 grid grid-rows-[90%_10%] gap-2 place-items-center p-3 rounded-lg shadow-sm border border-transparent hover:bg-primary-medium h-30"
                @click="setDietary(DIET_VEGAN)">
              <SeedlingIcon class="w-full h-full"/>
              <span>Vegan</span>
            </button>

            <button
                class="flex-1 grid grid-rows-[90%_10%] gap-2 place-items-center p-3 rounded-lg shadow-sm border
              border-transparent hover:bg-primary-medium h-30"
                @click="setDietary(DIET_VEGETARIAN)">
              <CarrotIcon class="w-full h-full"/>
              <span>Vegetarian</span>
            </button>

            <button
                class="flex-1 grid grid-rows-[90%_10%] gap-2 place-items-center p-3 rounded-lg shadow-sm border
              border-transparent hover:bg-primary-medium h-30"
                @click="setDietary(DIET_GLUTENFREE)">
              <GlutenFreeIcon class="w-full h-full"/>
              <span>Gluten Free</span>
            </button>

            <button
                class="flex-1 grid grid-rows-[90%_10%] gap-2 place-items-center p-3 rounded-lg shadow-sm border
              border-transparent hover:bg-primary-medium h-30"
                @click="setDietary(DIET_DAIRYFREE)">
              <DairyFreeIcon class="w-full h-full"/>
              <span>Dairy Free</span>
            </button>

          </div>
        </section>

        <!--        Difficulty-->
        <section class="p-5 flex flex-col gap-3">
          <label class="text-sl font-semibold text-primary" for="country">Difficulty</label>
          <div class="w-full relative">
            <ul class="list-none p-0 flex w-full gap-3">
              <li class="flex items-center w-full">
                <input id="easy" v-model="filters.difficulty" class="hidden-dot peer" name="difficulty" type="radio"
                       value="easy">
                <label
                    class="p-2.5 border border-green-600/40 rounded-lg bg-transparent cursor-pointer transition-colors peer-checked:bg-green-100 block text-center w-full"
                    for="easy">
                  <span class="text-md text-green-600/70">Easy</span>
                </label>
              </li>
              <li class="flex items-center w-full">
                <input id="medium" v-model="filters.difficulty" class="hidden-dot peer" name="difficulty" type="radio"
                       value="medium">
                <label
                    class="p-2.5 border border-yellow-600/40 rounded-lg bg-transparent cursor-pointer transition-colors peer-checked:bg-yellow-100 block text-center w-full"
                    for="medium">
                  <span class="text-md text-yellow-600/70">Medium</span>
                </label>
              </li>
              <li class="flex items-center w-full">
                <input id="hard" v-model="filters.difficulty" class="hidden-dot peer" name="difficulty" type="radio"
                       value="hard">
                <label
                    class="p-2.5 border border-red-600/40 rounded-lg bg-transparent cursor-pointer transition-colors peer-checked:bg-red-100 block text-center w-full"
                    for="hard">
                  <span class="text-md text-red-600/70">Hard</span>
                </label>
              </li>
            </ul>
          </div>
        </section>

        <!--        Countries-->
        <section class="p-5 flex flex-col gap-3">
          <label class="text-sl font-bold text-primary" for="country">Cuisine / Country</label>
          <DropDownSelect v-model="filters.country" :data="countriesList" class="w-full"/>
        </section>
      </template>

      <!--      footer-->
      <template #footer>
        <div class="grid grid-cols-[25%_70%] justify-between font-bold">
          <button class="p-3 bg-transparent rounded-lg cursor-pointer hover:bg-primary-medium text-gray-500"
                  @click="clearFilters">
            Clear All
          </button>
          <button class="p-3 bg-primary-dark rounded-lg text-primary-light cursor-pointer hover:bg-primary"
                  @click="applyFilter">Apply Filters
          </button>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<style lang="scss" scoped>

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.hidden-dot {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: transparent;
  border: none;
  outline: none;
}

input[type='number'] {
  -moz-appearance: textfield;
}

</style>