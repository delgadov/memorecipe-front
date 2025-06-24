<script setup lang="ts">

import Recommendations from "~/components/content/recommendations/Recommendations.vue";
import RecipeCard from "~/components/content/recipe/RecipeCard.vue";
import {useRoute, useRouter} from "#vue-router";
import {usePagination} from "~/composables/usePagination";

const route = useRoute();
const router = useRouter();

const page = ref(Number(route.query.page))
const currentPage = ref(page.value > 0 ? page : 1);

watch(currentPage, (val) => {
  router.replace({query: {...route.query, page: val.toString()}});
});

const cards = ref([
      {
        id: 1,
        url: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092',
        name: 'Classic Pizza',
        description: 'Classic Margherita Pizza with fresh basil and mozzarella.',
        level: 1,
        time: 20,
        comments: 12,
        hearts: 45,
        foodType: 'Pizza',
        country: 'Italy',
      },
      {
        id: 2,
        url: 'https://images.unsplash.com/photo-1546069901-eacef0df6022',
        name: 'Cheeseburger',
        description: 'Juicy Cheeseburger with crispy fries.',
        level: 2,
        time: 25,
        comments: 8,
        hearts: 38,
        foodType: 'Burger',
        country: 'USA',
      },
      {
        id: 3,
        url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8',
        name: 'Spaghetti Carbonara',
        description: 'Spaghetti Carbonara with creamy egg sauce and pancetta.',
        level: 3,
        time: 30,
        comments: 14,
        hearts: 50,
        foodType: 'Pasta',
        country: 'Italy',
      },
      {
        id: 4,
        url: 'https://media.istockphoto.com/id/1829241109/photo/enjoying-a-brunch-together.jpg?s=612x612&w=0&k=20&c=9awLLRMBLeiYsrXrkgzkoscVU_3RoVwl_HA-OT-srjQ=',
        name: 'Grilled Chicken Salad',
        description: 'Grilled Chicken Salad with avocado and vinaigrette.',
        level: 1,
        time: 15,
        comments: 6,
        hearts: 24,
        foodType: 'Salad',
        country: 'USA',
      },
      {
        id: 5,
        url: 'https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505',
        name: 'Avocado Toast',
        description: 'Avocado Toast with poached egg and microgreens.',
        level: 2,
        time: 22,
        comments: 4,
        hearts: 31,
        foodType: 'Toast',
        country: 'Australia',
      },
      {
        id: 6,
        url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90',
        name: 'Traditional Sushi',
        description: 'Traditional Sushi platter with tuna, salmon, and eel.',
        level: 3,
        time: 120,
        comments: 22,
        hearts: 60,
        foodType: 'Sushi',
        country: 'Japan',
      },
      {
        id: 7,
        url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
        name: 'Buttermilk Pancakes',
        description: 'Stack of Buttermilk Pancakes with maple syrup.',
        level: 3,
        time: 77,
        comments: 7,
        hearts: 40,
        foodType: 'Pancake',
        country: 'USA',
      },
      {
        id: 8,
        url: 'https://images.unsplash.com/photo-1551218808-94e220e084d2',
        name: 'Loaded Nachos',
        description: 'Loaded Nachos with cheese, beans, and jalapeños.',
        level: 2,
        time: 40,
        comments: 11,
        hearts: 35,
        foodType: 'Snack',
        country: 'Mexico',
      },
      {
        id: 9,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRALAGFcVj2zAWMAViVc4z4RQAFQFvO5sKSKw&s',
        name: 'Chocolate Lava Cake',
        description: 'Chocolate Lava Cake with vanilla ice cream.',
        level: 1,
        time: 10,
        comments: 17,
        hearts: 52,
        foodType: 'Dessert',
        country: 'France',
      },
      {
        id: 10,
        url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
        name: 'Buddha Bowl',
        description: 'Healthy Buddha Bowl with quinoa, chickpeas, and greens.',
        level: 2,
        time: 25,
        comments: 5,
        hearts: 29,
        foodType: 'Bowl',
        country: 'Fusion',
      }
    ]
);

const {goToPage, paginatedItems, paginationRange} = usePagination(cards, 2, 5, currentPage);

</script>

<template>
  <div class="w-full h-full">
    <section>
      <Recommendations/>
    </section>
    <section aria-labelledby="recipes" class="mt-5 mb-5">
      <h2 id="recipes" class="font-bold text-4xl text-primary mb-5">Recipes</h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div v-for="card in paginatedItems" :key="card.id">
          <RecipeCard :recipe-name="card.name" :img-url="card.url" :description="card.description" :level="card.level"
                      :time-in-minutes="card.time" :comments="card.comments" :hearts="card.hearts"
                      :country="card.country" :food-type="card.foodType"/>
        </div>
      </div>
    </section>

    <!--    Pagination Control -->
    <nav class="flex justify-center gap-2 overflow-x-auto" aria-label="Pagination">
      <button
          @click="goToPage(currentPage - 1)"
          class="w-15 bg-primary-dark font-medium text-white rounded-md border-primary-dark text-sm py-1.5 px-3 disabled:opacity-40 cursor-pointer hover:bg-primary">
        Prev
      </button>
      <button v-for="i in paginationRange"
              :class="[
                  'w-15 font-medium  rounded-md border border-primary text-sm py-1.5 px-3 disabled:opacity-40 cursor-pointer hover:bg-primary/10',
                  currentPage == i ? 'bg-primary-dark text-white' : 'bg-transparent text-primary'
              ]"
              @click="goToPage(i)"
      >
        {{ i }}
      </button>
      <button
          @click="goToPage(currentPage + 1)"
          class="w-15 bg-primary-dark font-medium text-white rounded-md border-primary-dark text-sm py-1.5 px-3 disabled:opacity-40 cursor-pointer hover:bg-primary">
        Next
      </button>
    </nav>
  </div>
</template>

<style scoped>

</style>