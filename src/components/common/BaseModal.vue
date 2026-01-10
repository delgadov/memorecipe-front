<script lang="ts" setup>

import CloseIcon from "~/components/icons/CloseIcon.vue";

const props = defineProps<{
  showModal: boolean,
  modalName: string,
}>();

const emit = defineEmits<{
  (e: 'update:showModal', value: boolean): void;
}>();

watch(() => props.showModal, (isOpen: boolean) => {
  if (isOpen) {
    document.body.style.overflowY = 'hidden';
  } else {
    document.body.style.overflowY = '';
  }
});

onUnmounted(() => {
  document.body.style.overflowY = '';
})

const closeModal = () => emit('update:showModal', false);
</script>

<template>
  <Transition name="appear">
    <div v-show="showModal" class="fixed flex justify-center lg:items-center inset-0 z-50 overflow-y-auto">

      <!--        Overlay-->
      <div class="fixed flex justify-center items-center inset-0 bg-gray-700/50 z-49"
           @click.self="closeModal()"/>

      <!--        Window-->
      <div class="relative w-128 max-w-[100%] h-min max-h-[100%] flex flex-col bg-primary-light z-50 lg:rounded-xl">
        <div class="p-4 border-b border-b-primary/30">
          <div class="w-full h-min flex items-center justify-center">
            <p class="text-2xl font-bold text-primary">{{ modalName }}</p>
          </div>

          <!--          Close button-->
          <button
              class="absolute top-0 right-0 cursor-pointer font-medium text-primary rounded-lg scale-75 hover:bg-primary-medium transition-all duration-200"
              @click="closeModal()">
            <CloseIcon fill="#333333"/>
          </button>
        </div>

        <!--        content-->
        <div class="overflow-y-auto flex-grow hover-scrollbar">
          <slot name="content"/>
        </div>

        <!--        Footer-->
        <div class="border-t border-t-primary/30 p-4">
          <slot class="bg" name="footer"/>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.appear-enter-active, .appear-leave-active {
  transition: opacity 200ms ease;
}

.appear-enter-from, .appear-leave-to {
  opacity: 0;
}

.appear-enter-to, .appear-leave-from {
  opacity: 1;
}
</style>