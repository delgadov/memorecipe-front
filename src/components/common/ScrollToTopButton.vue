<script lang="ts" setup>
import UpArrowIcon from "~/components/icons/UpArrowIcon.vue";

const {scrollToTop, showScrollToTop} = useScrollToTop();
</script>

<template>
  <Transition name="show">
    <div v-show="showScrollToTop" class="w-min h-min fixed right-8 bottom-8 z-10">
      <button aria-label="Back to Top" class="bg-primary-dark rounded-full p-3 shadow-lg cursor-pointer hover:bg-primary"
              @click="scrollToTop()">
        <UpArrowIcon fill="white"/>
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.show-enter-active, .show-leave-active {
  transition: all 300ms ease;
}

.show-enter-from, .show-leave-to {
  transform: translateY(8rem);
  opacity: 0;
}

</style>