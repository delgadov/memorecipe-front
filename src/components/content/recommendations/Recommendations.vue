<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import {Carousel, Slide, Pagination, Navigation} from "vue3-carousel";
import RecommendationCard from "~/components/content/recommendations/RecommendationCard.vue";

const slides = ref([
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
]);

const activeSlide = ref<number>(0);

const carouselConfig = {
  wrapAround: true,
  autoplay: 5000,
  pauseAutoplayOnHover: true,
  gap: 10,
  breakpointsMode: "viewport",
  breakpoints: {
    400: {
      itemsToShow: 1.5,
    },
    700: {
      itemsToShow: 2.5,
    },
  }
};
</script>

<template>
  <div class="w-full h-full flex justify-center items-center select-none">
    <Carousel
        v-bind="carouselConfig"
        v-model="activeSlide"
        class="relative w-full h-96 shrink-0 rounded-lg">
      <Slide v-for="(slide, index) in slides" :key="slide.id">
        <RecommendationCard :img-url="slide.url" :description="slide.description" :time="slide.time" :activeSlide="activeSlide == index" class="cursor-pointer"/>
      </Slide>
      <template #addons>
        <Pagination/>
        <Navigation/>
      </template>

    </Carousel>
  </div>
</template>

<style scoped>
@import "@/assets/css/main.css";

:root {
  --carousel-transition: 300ms;
  --carousel-opacity-inactive: 0.7;
  --carousel-opacity-active: 1;
  --carousel-opacity-near: 0.9;
}
.carousel {
  --vc-pgn-background-color: var(--primary-light);
  --vc-pgn-active-color: var(--primary);
  --vc-pgn-border-radius: 0.35rem;
  --vc-pgn-height: 0.35rem;
  --vc-pgn-width: 0.35rem;

  --vc-nav-background: rgba(var(--primary-light-rgb), 0.5);
  --vc-nav-border-radius: 1rem;
  --vc-nav-color: var(--primary-dark);
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition:
      opacity var(--carousel-transition),
      transform var(--carousel-transition),
      filter var(--carousel-transition);
}

.carousel.is-dragging .carousel__slide {
  transition:
      opacity var(--carousel-transition),
      transform var(--carousel-transition),
      filter var(--carousel-transition);
}

.carousel__slide {
  opacity: var(--carousel-opacity-inactive);
  transform: translateX(10px) rotateY(-12deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: var(--carousel-opacity-near);
  transform: rotateY(-10deg) scale(0.95);
  filter: blur(1px);
}

.carousel__slide--active {
  opacity: var(--carousel-opacity-active);
  transform: rotateY(0) scale(1);
}

.carousel__slide--next {
  opacity: var(--carousel-opacity-near);
  transform: rotateY(10deg) scale(0.95);
  filter: blur(1px);
}

.carousel__slide--next ~ .carousel__slide {
  opacity: var(--carousel-opacity-inactive);
  transform: translateX(-10px) rotateY(12deg) scale(0.9);
}

</style>