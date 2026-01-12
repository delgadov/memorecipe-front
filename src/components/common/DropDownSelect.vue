<script lang="ts" setup>

import type {ReturnType} from "birpc";

const props = defineProps<{
  data: Array<any>,
  modelValue?: string
}>();

const emit = defineEmits(['update:modelValue']);

const showValues = ref<boolean>(false);
const currentValue = ref<string | number>(props.modelValue || props.data[0]);

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

  emit("update:modelValue", newCurrentValue);
});

// Watch for any change coming from the parent such as filter and set it back to default
watch(() => props.modelValue, (newValue) => {
  const targetValue = newValue == undefined ? props.data[0] : newValue;

  if (targetValue !== currentValue) {
    currentValue.value = targetValue;
  }
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

const showUpwards = ref(false);

const toggleDropdown = async () => {
  if (showValues.value) {
    showValues.value = !showValues.value;
    return;
  }

  const rect = dropDownRef.value?.getBoundingClientRect();
  if (rect) {
    console.log(rect.bottom)
    const spaceBelow = window.innerHeight - rect.top;
    const minExpectedHeight = 200;
    showUpwards.value = minExpectedHeight > spaceBelow;
  }
  showValues.value = !showValues.value;
};

</script>

<template>
  <div class="relative select-none cursor-pointer text-md z-99 ">
    <div ref="dropDownRef"
         :class="[
      'relative border-3 shadow-sm z-10 box-border rounded-xl bg-white',
      showValues && showUpwards ? 'rounded-b-xl border-primary' : '',
      showValues && !showUpwards ? 'rounded-t-xl rounded-b-none' : '',
      !showValues ? 'border-transparent' : ''

  ]" @click="toggleDropdown">
      <!--      Dropdown-->
      <div class="grid grid-cols-[9fr_1fr]">
        <div class="p-4 whitespace-nowrap text-ellipsis overflow-hidden flex justify-start gap-3 text-gray-unselected">
          <p class="text-gray-selected">{{ currentValue }}</p>
        </div>
        <div class="flex h-full w-5 right-2 inset-y-0 items-center pointer-events-none z-1 bg-transparent">
          <IconsDownArrow :class="[
            'transition-transform duration-300 ease-in-out',
            showValues ? 'rotate-180' : 'rotate-0'
        ]"/>
        </div>
      </div>
    </div>
    <!--    List-->

    <Transition name="dropdown">
      <div v-show="showValues"
           :class="[
             'absolute border-3 right-0 left-0 h-min shadow-sm border-primary rounded-xl overflow-y-scroll bg-white box-border text-gray-unselected',
             showUpwards ? 'bottom-full mb-2' : 'top-full'
         ]">
        <ul class="flex flex-col max-h-[calc(3rem*8)] " style="scrollbar-gutter: stable;">
          <li v-for="value in data"
              :ref="setItemRef"
              :class="[
                'py-3 px-4 hover:bg-gray-light cursor-pointer',
                currentValue === value ? 'bg-primary/20 text-gray-selected font-bold' : 'bg-white',
                ]"
              :data-value="String(value)" @click="currentValue = String(value)">{{ value }}
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.1s ease-in;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-enter-from.bottom-full,
.dropdown-leave-to.bottom-full {
  transform: translateY(10px);
}

:scope > div, :scope > div > div {
  box-sizing: border-box;
}


</style>