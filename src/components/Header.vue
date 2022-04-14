<script setup lang="ts">
import type { Page } from '@/interfaces';


defineProps<{
  page: Page
}>()

const emit = defineEmits<{
  (e: 'navigate', page: Page): void
}>()

</script>

<template>
  <header class="px-20 flex flex-row items-center">
    <a href="#" class="flex items-center mr-20">
      <img src="../assets/logo.svg" alt="Vue.js Logo">
      <span class="logo">Dyma</span>
    </a>
    <ul class="flex-1 flex">
      <li class="mr-10"><a :class="{ active: page === 'Boutique' }" @click="emit('navigate', 'Boutique')">Boutique</a></li>
      <li><a :class="{ active: page === 'Admin' }" @click="emit('navigate', 'Admin')">Admin</a></li>
    </ul>
    <ul class="flex">
      <li class="mr-10"><a>Inscription</a></li>
      <li><a>Connexion</a></li>
    </ul>
  </header>
</template>

<style lang="scss" scoped>
header {
  background-color: var(--primary-1);
  color: var(--text-primary-color);

  a {
    cursor: pointer;

    &.active {
      text-decoration: underline;
    }

    img {
      width: 20px;
      margin-right: 5px;
    }

    .logo {
      font-weight: 700;
      font-size: 20px;
    }
  }

}
</style>