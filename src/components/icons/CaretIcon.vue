﻿<script setup lang="ts">

defineProps<{
  stroke: string
}>();
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" :stroke="stroke">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
  </svg>
</template>

