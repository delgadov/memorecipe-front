<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import {Carousel, Slide, Pagination, Navigation} from "vue3-carousel";
import RecommendationCard from "~/components/content/recommendations/RecommendationCard.vue";

const slides = Array.from({length: 4}, (_, index) => {
  const data = [
    {
      url: 'https://images.immediate.co.uk/production/volatile/sites/2/2021/03/Toad-In-The-Hole-fadbeab.jpg?quality=90&webp=true&resize=900,600',
      description: 'Classic toad-in-the-hole with sausages baked in Yorkshire pudding batter.'
    },
    {
      url: 'https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M=',
      description: 'Fluffy and golden — a comfort food classic served with gravy.'
    },
    {
      url: 'https://img.freepik.com/free-photo/top-view-table-full-food_23-2149209253.jpg?semt=ais_hybrid&w=740',
      description: 'Family-sized toad-in-the-hole, perfect for a hearty dinner.'
    },
    {
      url: 'https://food.fnr.sndimg.com/content/dam/images/food/plus/fullset/2021/01/19/0/FNKLIve_Megan-Mitchell_Meal-Prep-Farro-and-Quinoa-Veggie-Bowls_s4x3.jpg.rend.hgtvcom.1280.1280.suffix/1611075895651.webp',
      description: 'Mini toad-in-the-hole portions — ideal for kids or party platters.'
    }
  ];
  return {
    id: index + 1,
    url: data[index].url,
    description: data[index].description,
  }
});

const activeSlide = ref(0);

const getActiveSlide = (slideId: number) => {
  return activeSlide.value == slideId;
}

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
      <Slide v-for="slide in slides" :key="slide.id">
        <RecommendationCard :img-url="slide.url" :description="slide.description" :activeSlide="getActiveSlide(slide.id - 1)" class="cursor-pointer"/>
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