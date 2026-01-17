<script lang="ts" setup>
import BaseModal from "~/components/common/BaseModal.vue";
import {useCountriesList, useInputUtils, useTimeSlider} from "#imports";
import DropDownSelect from "~/components/common/DropDownSelect.vue";
import {useRoute, useRouter} from "#vue-router";
import {useHorizontalScroll} from "~/composables/useHorizontalScroll";

const {selectAll, sanitizeNumeric, blockNonNumeric, checkMinimum, checkMaximum, errorMessage} = useInputUtils();


const PREP_OPTIONS = [
  {label: '< 15 min', value: "15"},
  {label: '15-30 min', value: "35"},
  {label: '30-60 min', value: "60"},
  {label: '1hr +', value: "999"}
];

const DIETARY_TYPE_OPTIONS = [
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

const MEAL_TYPE_OPTIONS = [
  {label: "Breakfast", icon: "mdi:coffee-outline", value: "breakfast"},
  {label: "Lunch", icon: "mdi:silverware-fork-knife", value: "lunch"},
  {label: "Dinner", icon: "mdi:food-variant", value: "dinner"},
  {label: "Snack", icon: "mdi:cookie-outline", value: "snack"},
  {label: "Dessert", icon: "mdi:ice-cream", value: "dessert"},
];

const COOKING_TYPE_OPTIONS = [
  {label: "Air Fryer", icon: "mdi:air-filter", value: "air-fryer"}, // Or mdi:fan
  {label: "Bake", icon: "mdi:stove", value: "bake"},
  {label: "Grill", icon: "mdi:grill", value: "grill"},
  {label: "Slow Cook", icon: "mdi:pot-steam", value: "slow-cook"},
  {label: "No-Cook", icon: "mdi:flash-off", value: "no-cook"},
  {label: "Stovetop", icon: "mdi:pan", value: "stovetop"},
];

const SEASON_OPTIONS = [
  {label: "Spring", icon: "mdi:flower-tulip-outline", value: "spring"},
  {label: "Summer", icon: "mdi:white-balance-sunny", value: "summer"},
  {label: "Autumn", icon: "mdi:leaf-maple", value: "autumn"},
  {label: "Winter", icon: "mdi:snowflake", value: "winter"},
];

const CALORIES_MIN = 0;
const CALORIES_MAX = 10000;
const DEFAULT_MIN_CALORIES = 200;
const DEFAULT_MAX_CALORIES = 1500;

const showFilter = ref<boolean>(false);

const countriesList = useCountriesList();
countriesList.unshift("Any");

const router = useRouter();
const route = useRoute();

const filters = ref({
  time: route.query.time?.toString(),
  dietary: route.query.dietary
      ? (Array.isArray(route.query.dietary) ? route.query.dietary : [route.query.dietary])
      : [],
  difficulty: route.query.difficulty
      ? (Array.isArray(route.query.difficulty) ? route.query.difficulty : [route.query.difficulty])
      : [],
  mealType: route.query.mealType
      ? (Array.isArray(route.query.mealType) ? route.query.mealType : [route.query.mealType])
      : [],
  cookingType: route.query.cookingType
      ? (Array.isArray(route.query.cookingType) ? route.query.cookingType : [route.query.cookingType])
      : [],
  seasons: route.query.seasons
      ? (Array.isArray(route.query.seasons) ? route.query.seasons : [route.query.seasons])
      : [],
  minCalories: route.query.caloriesMin ? route.query.caloriesMin : DEFAULT_MIN_CALORIES,
  maxCalories: route.query.caloriesMax ? route.query.caloriesMax : DEFAULT_MAX_CALORIES,
  country: route.query.country?.toString(),
})


const applyFilter = () => {
  const difficultyCleanArray = filters.value.difficulty.filter(item => item && item.trim() !== "");
  const dietaryCleanArray = filters.value.dietary.filter(item => item && item.trim() !== "");
  const mealTypeCleanArray = filters.value.mealType.filter(item => item && item.trim() !== "");
  const cookingTypeCleanArray = filters.value.cookingType.filter(item => item && item.trim() !== "");
  const seasonsTypeCleanArray = filters.value.seasons.filter(item => item && item.trim() !== "");

  router.push({
    query: {
      ...route.query,
      time: filters.value.time || undefined,
      minCalories: filters.value.minCalories || undefined,
      maxCalories: filters.value.maxCalories || undefined,
      country: filters.value.country || undefined,
      difficulty: difficultyCleanArray.length > 0 ? difficultyCleanArray : undefined,
      dietary: dietaryCleanArray.length > 0 ? dietaryCleanArray : undefined,
      mealType: mealTypeCleanArray.length > 0 ? mealTypeCleanArray : undefined,
      cookingType: cookingTypeCleanArray.length > 0 ? cookingTypeCleanArray : undefined,
      seasonsType: seasonsTypeCleanArray.length > 0 ? seasonsTypeCleanArray : undefined,
    }
  });
};

const clearFilters = () => {
  filters.value.time = undefined;
  filters.value.minCalories = undefined;
  filters.value.maxCalories = undefined;
  filters.value.difficulty = [];
  filters.value.dietary = [];
  filters.value.mealType = [];
  filters.value.cookingType = [];
  filters.value.seasons = [];
  filters.value.country = undefined;

  applyFilter();
};

const setValue = (value: string, list: any[]) => {
  if (!valueAlreadyInInList(value, list)) {
    list.push(value);
  } else {
    const index = list.indexOf(value);
    if (index > -1) {
      list.splice(index, 1);
    }
  }
};

const valueAlreadyInInList = (value: string, list: any[]): boolean => {
  return list.includes(value);
}


const scrollContainer = ref<HTMLElement | null>(null);
useHorizontalScroll(scrollContainer);

const activeFilterCount = computed(() => {
  let count = 0;

  count += filters.value.dietary?.length || 0;
  count += filters.value.difficulty?.length || 0;
  count += filters.value.mealType?.length || 0;
  count += filters.value.cookingType?.length || 0;
  count += filters.value.seasons?.length || 0;

  if (filters.value.country && filters.value.country !== "Any") count++;
  if (filters.value.time) count++;

  return count;
});

const hasActiveFilters = computed(() => activeFilterCount.value > 0);
</script>

<template>
  <div class="">
    <button
        :class="[
      hasActiveFilters
        ? 'bg-primary/10 border-primary text-primary shadow-md'
        : 'bg-white border-primary-dark text-dark-text-default hover:bg-primary-medium shadow-sm'
    ]"
        class="group relative rounded-xl text-sm font-bold w-full h-11 px-4 border-2 transition-all duration-300 flex items-center justify-center gap-2"
        @click="showFilter = !showFilter"
    >
      <Icon
          class="text-xl transition-transform group-hover:scale-110"
          name="material-symbols:filter-list-rounded"
      />

      <span>Filters</span>

      <span
          v-if="activeFilterCount > 0"
          class="flex items-center justify-center bg-primary text-white text-[10px] rounded-full min-w-[1.2rem] h-[1.2rem] px-1"
      >
    {{ activeFilterCount }}
  </span>
    </button>
    <BaseModal v-model:show-modal="showFilter" class="modal" modal-name="Refine Recipes">
      <template #content>
        <!--        Preparation -->
        <section class="p-5 flex flex-col gap-3 w-full">
          <h3 class="text-lg font-bold leading-tight tracking-[-0.015em] ">Prepare Time</h3>
          <div class="grid grid-cols-2 gap-3 p-2">
            <button v-for="option in PREP_OPTIONS"
                    :key="option.value"
                    :class="[
                        'group p-3 border-3 rounded-xl shadow-sm hover:cursor-pointer flex flex-col gap-1 justify-center items-center',
                filters.time === option.value? 'border bg-primary/20': 'border-transparent bg-white hover:border-gray-light',
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

        <!--        Calories Range-->
        <section class="p-5 flex flex-col gap-3 w-full">
          <h3 class="text-lg font-bold leading-tight tracking-[-0.015em]">Calories</h3>
          <div class="flex flex-col items-center justify-center gap-2">
            <p class="text-gray-selected text-sm w-full">MIN KCAL</p>
            <div class="relative">
              <input v-model="filters.minCalories"
                     class="text-primary font-extrabold border-3 border-transparent text-xl w-full p-6 rounded-3xl shadow-sm bg-white hover:cursor-pointer hover:border-gray-light"
                     inputmode="numeric"
                     @beforeinput="(e) => {
                         blockNonNumeric;
                         checkMinimum(e, CALORIES_MIN);
                       }"
                     @focus="selectAll"
                     @input="sanitizeNumeric"
                     @keydown="(e) => {
                         blockNonNumeric;
                         checkMinimum(e, CALORIES_MIN,  `Minimum of ${CALORIES_MIN} kcal`);
                       }">
              <p class="absolute flex justify-center items-center h-full top-0 right-6  text-sm text-gray-unselected">
                kcal
              </p>
              <Transition name="errorMessage">
                <p v-show="errorMessage !== null"
                   :key="errorMessage"
                   class="absolute flex justify-center items-center left-0 bottom-1 w-full text-sm text-red-error">
                  {{ errorMessage }}</p>
              </Transition>
            </div>
          </div>


        </section>

        <!--        Dietary Type-->
        <section class="p-5 flex flex-col gap-3 w-full">
          <h3 class="text-lg font-bold leading-tight tracking-[-0.015em] ">Dietary Type</h3>
          <div ref="scrollContainer"
               class="flex flex-row flex-nowrap gap-3 p-2 hover-scrollbar overflow-x-auto">
            <button v-for="option in DIETARY_TYPE_OPTIONS"
                    :key="option.value"
                    :class="[
                        'shrink-0 p-3 border-3 rounded-xl shadow-sm hover:cursor-pointer flex flex-col gap-1 justify-center items-center max-h-[5rem] w-[7rem]',
                valueAlreadyInInList(option.value, filters.dietary) ? 'border bg-primary/20': 'border-transparent bg-white hover:border-gray-light',
            ]"
                    @click="setValue(option.value, filters.dietary)">
              <Icon
                  :class="['text-dark-text-default text-3xl', valueAlreadyInInList(option.value, filters.dietary) ? 'text-gray-selected font-bold' : 'text-gray-unselected']"
                  :name="option.icon"/>
              <span
                  :class="['text-sm no-select', valueAlreadyInInList(option.value, filters.dietary) ? 'text-gray-selected font-bold' : 'text-gray-unselected']">
                {{ option.label }}</span>
            </button>
          </div>
        </section>


        <!--        Difficulty-->
        <section class="p-5 flex flex-col gap-3 w-full">
          <h3 class="text-lg font-bold leading-tight tracking-[-0.015em] ">Difficulty</h3>
          <div class="flex flex-row items-center justify-between gap-3 p-2 w-full rounded-full bg-gray-light">
            <button v-for="option in DIFFICULTY_OPTIONS"
                    :key="option.value"
                    :class="[
                        'py-3 border-3 rounded-full shadow-sm hover:cursor-pointer flex flex-col gap-1 justify-center items-center w-full',
                valueAlreadyInInList(option.value, filters.difficulty) ? 'border bg-primary/40': 'border-transparent bg-white hover:border-gray-light',
            ]"
                    @click="setValue(option.value, filters.difficulty)">
                            <span
                                :class="['text-base no-select', valueAlreadyInInList(option.value, filters.difficulty) ? 'text-gray-selected font-bold' : 'text-gray-unselected']">
                {{ option.label }}</span>
            </button>
          </div>
        </section>

        <!--        Meal Type-->
        <section class="p-5 flex flex-col gap-3 w-full">
          <h3 class="text-lg font-bold leading-tight tracking-[-0.015em] ">Meal Type</h3>
          <div ref="scrollContainer"
               class="flex flex-row flex-nowrap gap-3 p-2 hover-scrollbar overflow-x-auto">
            <button v-for="option in MEAL_TYPE_OPTIONS"
                    :key="option.value"
                    :class="[
                        'shrink-0 p-3 border-3 rounded-xl shadow-sm hover:cursor-pointer flex flex-col gap-1 justify-center items-center max-h-[5rem] w-[7rem]',
                valueAlreadyInInList(option.value, filters.mealType) ? 'border bg-primary/20': 'border-transparent bg-white hover:border-gray-light',
            ]"
                    @click="setValue(option.value, filters.mealType)">
              <Icon
                  :class="['text-dark-text-default text-3xl', valueAlreadyInInList(option.value, filters.mealType) ? 'text-gray-selected font-bold' : 'text-gray-unselected']"
                  :name="option.icon"/>
              <span
                  :class="['text-sm no-select', valueAlreadyInInList(option.value, filters.mealType) ? 'text-gray-selected font-bold' : 'text-gray-unselected']">
                {{ option.label }}</span>
            </button>
          </div>
        </section>

        <!--        Cooking Type-->
        <section class="p-5 flex flex-col gap-3 w-full">
          <h3 class="text-lg font-bold leading-tight tracking-[-0.015em] ">Cooking Type</h3>
          <div ref="scrollContainer"
               class="flex flex-row flex-nowrap gap-3 p-2 hover-scrollbar overflow-x-auto">
            <button v-for="option in COOKING_TYPE_OPTIONS"
                    :key="option.value"
                    :class="[
                        'shrink-0 p-3 border-3 rounded-xl shadow-sm hover:cursor-pointer flex flex-col gap-1 justify-center items-center max-h-[5rem] w-[7rem]',
                valueAlreadyInInList(option.value, filters.cookingType) ? 'border bg-primary/20': 'border-transparent bg-white hover:border-gray-light',
            ]"
                    @click="setValue(option.value, filters.cookingType)">
              <Icon
                  :class="['text-dark-text-default text-3xl', valueAlreadyInInList(option.value, filters.cookingType) ? 'text-gray-selected font-bold' : 'text-gray-unselected']"
                  :name="option.icon"/>
              <span
                  :class="['text-sm no-select', valueAlreadyInInList(option.value, filters.cookingType) ? 'text-gray-selected font-bold' : 'text-gray-unselected']">
                {{ option.label }}</span>
            </button>
          </div>
        </section>

        <!--        Seasons-->
        <section class="p-5 flex flex-col gap-3 w-full">
          <h3 class="text-lg font-bold leading-tight tracking-[-0.015em] ">Season Type</h3>
          <div ref="scrollContainer"
               class="flex flex-row flex-nowrap gap-3 p-2 hover-scrollbar overflow-x-auto">
            <button v-for="option in SEASON_OPTIONS"
                    :key="option.value"
                    :class="[
                        'shrink-0 p-3 border-3 rounded-xl shadow-sm hover:cursor-pointer flex flex-col gap-1 justify-center items-center max-h-[5rem] w-[7rem]',
                valueAlreadyInInList(option.value, filters.seasons) ? 'border bg-primary/20': 'border-transparent bg-white hover:border-gray-light',
            ]"
                    @click="setValue(option.value, filters.seasons)">
              <Icon
                  :class="['text-dark-text-default text-3xl', valueAlreadyInInList(option.value, filters.seasons) ? 'text-gray-selected font-bold' : 'text-gray-unselected']"
                  :name="option.icon"/>
              <span
                  :class="['text-sm no-select', valueAlreadyInInList(option.value, filters.seasons) ? 'text-gray-selected font-bold' : 'text-gray-unselected']">
                {{ option.label }}</span>
            </button>
          </div>
        </section>


        <!--        Countries-->
        <section class="p-5 flex flex-col gap-3 w-full">
          <h3 class="text-lg font-bold leading-tight tracking-[-0.015em] ">Cuisine</h3>
          <DropDownSelect v-model="filters.country" :data="countriesList" class="w-full text-base"/>
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

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-4px); }
  40%, 80% { transform: translateX(4px); }
}

.errorMessage-enter-active, .errorMessage-leave-active {
  transition: all 200ms ease;
  animation: shake 400ms linear;
}

.errorMessage-enter-from, .errorMessage-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.errorMessage-enter-to, .errorMessage-leave-from {
  opacity: 1;
  transform: translateY(0);
}


</style>