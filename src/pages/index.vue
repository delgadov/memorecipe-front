<script setup lang="ts">

import Recommendations from "~/components/content/recommendations/Recommendations.vue";
import RecipeCard from "~/components/content/recipe/RecipeCard.vue";

const cards = Array.from({length: 10}, (_, index) => {
  const data = [
    {
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
      url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
      name: 'Buddha Bowl',
      description: 'Healthy Buddha Bowl with quinoa, chickpeas, and greens.',
      level: 2,
      time: 25,
      comments: 5,
      hearts: 29,
      foodType: 'Bowl',
      country: 'Fusion',
    },
  ];
  return {
    id: index + 1,
    url: data[index].url,
    name: data[index].name,
    description: data[index].description,
    level: data[index].level,
    time: data[index].time,
    country: data[index].country,
    foodType: data[index].foodType,
    comments: data[index].comments,
    hearts: data[index].hearts,
  }
});
</script>

<template>
  <div class="w-full h-full">
    <section>
      <Recommendations/>
    </section>
    <section aria-labelledby="recipes" class="mt-5 mb-5">
      <h2 id="recipes" class="font-bold text-4xl text-primary mb-5">Recipes</h2>
      <div class="grid grid-cols-1 lg::grid-cols-2 gap-8">
        <div v-for="card in cards" :key="card.id">
          <RecipeCard :recipe-name="card.name" :img-url="card.url" :description="card.description" :level="card.level"
                      :time-in-minutes="card.time" :comments="card.comments" :hearts="card.hearts"
                      :country="card.country" :food-type="card.foodType"/>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>

</style>