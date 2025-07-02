<script setup lang="ts">

defineProps<{
  fill: string
}>();
</script>

<template>
  <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path fill-rule="evenodd" clip-rule="evenodd"
            d="M21 6L20.25 5.25H3.75L3 6V20.5607L6.31066 17.25H20.25L21 16.5V6ZM19.5 6.75V15.75H5.68934L4.5 16.9393V6.75H19.5Z"
            :fill="fill"></path>
    </g>
  </svg>
</template>