<script lang="ts" setup>

import type {ReturnType} from "birpc";

const props = defineProps<{
  data: Array<any>
}>();

const showValues = ref<boolean>(false);
const currentValue = ref<string | number>(props.data[0]);

let searchBuffer = "";
let bufferTimeout: ReturnType<typeof setTimeout> | null = null;

const dropDownRef = ref<HTMLDivElement | null>(null);
const itemEls = ref<HTMLLIElement[]>([]);
const currentIndex = ref<number>(-1);
const setItemRef = (el: Element | ComponentPublicInstance | null) => {
  if (el instanceof HTMLLIElement) itemEls.value.push(el);
};

const handleClickOutside = (event: MouseEvent) => {
  if (dropDownRef.value && !dropDownRef.value.contains(event.target as Node)) {
    showValues.value = false;
  }
}


watch(currentValue, (newCurrentValue) => {
  currentIndex.value = itemEls.value.findIndex((li) => li?.dataset?.value === newCurrentValue);
});
watch(currentIndex, (newCurrentIndex) => {
  currentValue.value = props.data[newCurrentIndex];
})

const handleKeyDown = async (event: KeyboardEvent) => {
  if (!showValues.value) return;

  if (event.key === "Enter") {
    showValues.value = false;

  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    currentIndex.value = currentIndex.value + 1 > (props.data.length - 1) ? currentIndex.value : currentIndex.value + 1;

    await nextTick();
    const el = itemEls.value[currentIndex.value];
    scrollToElement(el);
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    currentIndex.value = currentIndex.value - 1 < 0 ? currentIndex.value : currentIndex.value - 1;

    await nextTick();
    const el = itemEls.value[currentIndex.value];
    scrollToElement(el);
  } else if (event.key.length === 1) {
    searchBuffer += event.key;
    if (bufferTimeout) clearTimeout(bufferTimeout);
    bufferTimeout = setTimeout(() => {
      searchBuffer = "";
    }, 600);

    const match = props.data.find((item) => String(item).toLowerCase().startsWith(searchBuffer.toLowerCase()));
    if (match) {
      currentValue.value = match;
      await nextTick();
      const el = itemEls.value.find((li) => li?.dataset?.value === String(match));
      scrollToElement(el);
    }
  }
}

const scrollToElement = (el?: HTMLElement | HTMLLIElement) => {
  if (!el) return;
  el.scrollIntoView({block: 'nearest', inline: 'nearest', behavior: 'instant'});
};


onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', handleKeyDown);
});

onBeforeUpdate(() => {
  itemEls.value = [];
})

</script>

<template>
  <div class="relative select-none cursor-pointer text-md z-99">
    <div ref="dropDownRef"
         :class="[
      'relative border-1 border-primary z-10 box-border',
      showValues ? 'rounded-t-lg' : 'rounded-lg'

  ]" @click="showValues =!showValues">
      <!--      Dropdown-->
      <div class="grid grid-cols-[9fr_1fr]">
        <div class="py-2 px-4 whitespace-nowrap text-ellipsis overflow-hidden">
          {{ currentValue }}
        </div>
        <div class="flex h-full w-5 right-2 inset-y-0 items-center pointer-events-none z-1 bg-primary-light">
          <IconsDownArrow :class="[
            'transition-transform duration-300 ease-in-out',
            showValues ? 'rotate-180' : 'rotate-0'
        ]"/>
        </div>
      </div>
    </div>
    <!--    List-->
    <div v-show="showValues"
         class="absolute top-full right-0 left-0 h-min border-1 border-primary rounded-b-lg  bg-primary-light overflow-y-scroll  box-border">
      <ul class="flex flex-col max-h-[calc(2.52rem*5)]">
        <li v-for="value in data"
            :ref="setItemRef"
            :class="[
                'py-2 px-4 hover:bg-primary/10 cursor-pointer',
                currentValue === value ? 'bg-primary/20' : 'bg-primary-light',
                ]"
            :data-value="String(value)" @click="currentValue = String(value)">{{ value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

:scope > div, :scope > div > div {
  box-sizing: border-box;
}
</style>