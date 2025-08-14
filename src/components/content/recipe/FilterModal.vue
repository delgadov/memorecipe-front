<script lang="ts" setup>
import BaseModal from "~/components/common/BaseModal.vue";
import {useCountriesList, useTimeSlider} from "#imports";
import RightArrow from "~/components/icons/RightArrow.vue";
import DownArrow from "~/components/icons/DownArrow.vue";
import DropDownSelect from "~/components/common/DropDownSelect.vue";

const showFilter = ref<boolean>(false);

const min = 0;
const max = 150;
const step = 15;
const {currentTimeValue, numberOfLabels} = useTimeSlider(min, max, step, 15);

const countriesList = useCountriesList();
</script>

<template>
  <div class="">
    <button
        class="rounded-md text-sm bg-primary-light w-full h-8 px-3 border-1 border-primary-dark shadow-sm cursor-pointer hover:bg-primary-medium transition-all duration-200"
        @click="showFilter = !showFilter">
      Filters
    </button>
    <BaseModal v-model:show-modal="showFilter" class="modal" modal-name="Filters">
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
        <!--        Preparing time -->
        <section class="p-4 flex flex-col gap-3">
          <div class="flex items-baseline gap-3">
            <label class="text-xl font-semibold text-primary" for="time-range">Preparing Time</label>
            <span class="text-sm text-primary/60">(Minutes)</span>
          </div>

          <!-- Grid container -->
          <div class="slider-container">
            <input v-model.number="currentTimeValue"
                   :max="max"
                   :min="min"
                   :step="step"
                   class="range-slider"
                   list="time-range"
                   name="time-range" pattern="[0-9]*" type="range"/>

            <div class="flex justify-between mt-1 px-2 text-xs text-gray-400 select-none ">
              <span v-for="value in numberOfLabels" :key="value" class="flex justify-center w-0 mt-1">
                {{ value }}
              </span>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <input v-model.number="currentTimeValue"
                   class="border border-primary rounded-lg py-1 px-2 w-15 shadow-sm"
                   inputmode="numeric" name="prepTime"
                   pattern="[0-9]*" placeholder="Time" type="number"/>
          </div>
        </section>
        <section class="p-4 flex flex-col gap-3">
          <label class="text-xl font-semibold text-primary" for="country">Countries</label>
          <div class="w-fit relative">
            <DropDownSelect :data="countriesList" class="w-65"/>
<!--            <select id="country" class="appearance-none w-75 border border-primary rounded-lg shadow-sm focus:border-primary focus:border-1 focus:ring-primary"
                    name="country">
              <option value="Any">Any</option>
              <option v-for="country in countriesList" :value="country">{{ country }}</option>
            </select>-->
          </div>
        </section>
      </template>
      <template #footer>
        <div class="flex items-center justify-between font-bold">
          <button class="p-3 bg-transparent rounded-lg cursor-pointer hover:bg-primary-medium">Clear</button>
          <button class="p-3 bg-primary-dark rounded-lg text-primary-light cursor-pointer hover:bg-primary">Search
          </button>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<style lang="scss" scoped>

.slider-container {
  display: grid;
  grid-template-rows: auto auto;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}

</style>