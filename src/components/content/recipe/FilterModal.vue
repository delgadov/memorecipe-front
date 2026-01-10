<script lang="ts" setup>
import BaseModal from "~/components/common/BaseModal.vue";
import {useCountriesList, useTimeSlider} from "#imports";
import DropDownSelect from "~/components/common/DropDownSelect.vue";
import {useRoute, useRouter} from "#vue-router";
import SeedlingIcon from "~/components/icons/SeedlingIcon.vue";
import CarrotIcon from "~/components/icons/CarrotIcon.vue";
import GlutenFreeIcon from "~/components/icons/GlutenFreeIcon.vue";
import DairyFreeIcon from "~/components/icons/DairyFreeIcon.vue";
import {useHorizontalScroll} from "~/composables/useHorizontalScroll";

const PREP_OPTIONS = [
  {label: '< 15 min', value: "15"},
  {label: '15-30 min', value: "35"},
  {label: '30-60 min', value: "60"},
  {label: '1hr +', value: "999"}
];

const DIETARY_TYPE_OPTIONS_2 = [
  {label: 'Vegan', icon: 'mdi:leaf', value: "vegan"},
  {label: 'Vegetarian', icon: 'mdi:seed', value: "vegetarian"},
  {label: 'Gluten Free', icon: 'mdi:grain-off', value: "gluten-free"},
  {label: 'Dairy Free', icon: 'mdi:cup-off', value: "dairy-free"}, // Replaced cow-off with cup-off for better compatibility
  {label: 'Low Carb', icon: 'mdi:chart-bell-curve', value: "low-carb"},
  {label: 'Pescetarian', icon: 'mdi:fish', value: "pescetarian"},
  {label: 'Nut Free', icon: 'mdi:peanut-off', value: "nut-free"},
  {label: 'Keto', icon: 'mdi:flash', value: "keto"},
  {label: 'Paleo', icon: 'mdi:egg', value: "paleo"},
];

const DIFFICULTY_OPTIONS = [
  {label: "Easy", value: "easy"},
  {label: "Medium", value: "medium"},
  {label: "Hard", value: "hard"},
]

const showFilter = ref<boolean>(false);

const countriesList = useCountriesList();
countriesList.unshift("Any");

const router = useRouter();
const route = useRoute();

const filters = ref({
  difficulty: Array.isArray(route.query.difficulty) ? route.query.difficulty : [],
  country: route.query.country?.toString(),
  time: route.query.time?.toString(),
  dietary: Array.isArray(route.query.dietary) ? route.query.dietary : [],
});

const applyFilter = () => {
  const difficultyCleanArray = filters.value.difficulty.filter(item => item && item.trim() !== "");
  const dietaryCleanArray = filters.value.dietary.filter(item => item && item.trim() !== "");
  router.push({
    query: {
      ...route.query,
      time: filters.value.time || undefined,
      country: filters.value.country || undefined,
      difficulty: difficultyCleanArray.length > 0 ? difficultyCleanArray.join(',') : undefined,
      dietary: dietaryCleanArray.length > 0 ? dietaryCleanArray.join(',') : undefined,
    }
  });
};

const clearFilters = () => {
  filters.value.difficulty = [];
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

const setDifficulty = (difficulty: string) => {
  if (!difficultyAlreadyInList(difficulty)) {
    filters.value.difficulty.push(difficulty);
  } else {
    const index = filters.value.difficulty.indexOf(difficulty);
    if (index > -1) {
      filters.value.difficulty.splice(index, 1);
    }
  }
}

const dietAlreadyInList = (value: string): boolean => {
  return filters.value.dietary.includes(value);
}

const difficultyAlreadyInList = (value: string): boolean => {
  return filters.value.difficulty.includes(value);
}

const scrollContainer = ref<HTMLElement | null>(null);
useHorizontalScroll(scrollContainer);

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
        <section class="p-5 flex flex-col gap-3 w-full">
          <h3 class="text-lg font-bold leading-tight tracking-[-0.015em] pb-3">Dietary Type</h3>
          <div class="grid grid-cols-2 gap-3 p-2">
            <button v-for="option in PREP_OPTIONS"
                    :key="option.value"
                    :class="[
                        'group p-3 border-3 rounded-xl shadow-sm hover:cursor-pointer flex flex-col gap-1 justify-center items-center',
                filters.time === option.value? 'border bg-primary/20': 'border-transparent bg-white hover:border-gray-200',
            ]"
                    @click="filters.time = option.value">
              <Icon :class="[ 'text-[2rem]',
                        filters.time === option.value? 'text-gray-selected': 'bg-gray-unselected text-gray-unselected']"
                    name="material-symbols-light:clock-loader-10"/>
              <span
                  :class="['text-sm no-select', filters.time == option.value ? 'text-gray-selected font-bold' : 'text-gray-unselected']">
                {{ option.label }}</span>
            </button>
          </div>
        </section>

        <!--        Dietary Type-->
        <section class="p-5 flex flex-col gap-3 w-full">
          <h3 class="text-lg font-bold leading-tight tracking-[-0.015em] pb-3">Dietary Type</h3>
          <div ref="scrollContainer"
               class="flex flex-row flex-nowrap gap-3 p-2 hover-scrollbar overflow-x-auto">
            <button v-for="option in DIETARY_TYPE_OPTIONS_2"
                    :key="option.value"
                    :class="[
                        'shrink-0 p-3 border-3 rounded-xl shadow-sm hover:cursor-pointer flex flex-col gap-1 justify-center items-center max-h-[5rem] w-[7rem]',
                dietAlreadyInList(option.value) ? 'border bg-primary/20': 'border-transparent bg-white hover:border-gray-200',
            ]"
                    @click="setDietary(option.value)">
              <Icon
                  :class="['text-dark-text-default text-3xl', dietAlreadyInList(option.value) ? 'text-gray-selected font-bold' : 'text-gray-unselected']"
                  :name="option.icon"/>
              <span
                  :class="['text-sm no-select', dietAlreadyInList(option.value) ? 'text-gray-selected font-bold' : 'text-gray-unselected']">
                {{ option.label }}</span>
            </button>
          </div>
        </section>


        <!--        Difficulty-->
        <section class="p-5 flex flex-col gap-3 w-full">
          <h3 class="text-lg font-bold leading-tight tracking-[-0.015em] pb-3">Dietary Type</h3>
          <div class="flex flex-row items-center justify-between gap-3 p-2 w-full rounded-full bg-gray-200">
            <button v-for="option in DIFFICULTY_OPTIONS"
                    :key="option.value"
                    :class="[
                        'py-3 border-3 rounded-full shadow-sm hover:cursor-pointer flex flex-col gap-1 justify-center items-center w-full',
                difficultyAlreadyInList(option.value) ? 'border bg-primary/40': 'border-transparent bg-white hover:border-gray-200',
            ]"
                    @click="setDifficulty(option.value)">
                            <span
                                :class="['text-base no-select', difficultyAlreadyInList(option.value) ? 'text-gray-selected font-bold' : 'text-gray-unselected']">
                {{ option.label }}</span>
            </button>
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
          <button class="p-3 bg-transparent rounded-lg cursor-pointer hover:bg-primary-medium text-dark-text-default"
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