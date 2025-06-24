<script setup lang="ts">

import Logo from "~/components/header/Logo.vue";
import SearchInput from "~/components/header/SearchInput.vue";
import LoginButton from "~/components/header/LoginButton.vue";
import FavoriteButton from "~/components/header/FavoriteButton.vue";
</script>

<template>
  <!--  Empty class to take headers room -->
  <div class="w-full shrink-0 h-13"/>
  <div class="fixed top-0 left-0 z-100 w-full shrink-0 bg-primary-light h-13 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
    <div class="shrink-0 mx-auto max-w-screen-xl flex items-center justify-between px-4 h-full">
      <Logo class="shrink-0 cursor-pointer"/>

      <div class="flex gap-5">
        <SearchInput class="cursor-pointer"/>
        <FavoriteButton class="cursor-pointer"/>
        <LoginButton class="cursor-pointer"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>