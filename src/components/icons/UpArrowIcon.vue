﻿<script setup lang="ts">

defineProps<{
  fill: string
}>();
</script>

<template>
  <svg class="w-6 h-6" :fill="fill" :stroke="fill" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
  </svg>
</template>

