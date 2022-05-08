<script setup lang="ts">
import { reactive } from 'vue';
import Calc from './Calc.vue';

const state = reactive<{
  open: boolean;
}>({
  open: false,
});
</script>

<template>
  <header class="px-20 flex flex-row items-center">
    <a href="#" class="flex items-center mr-20">
      <img src="../assets/logo.svg" alt="Vue.js Logo" />
      <span class="logo">DymaShop</span>
    </a>
    <div class="flex justify-center items-center flex-1">
      <ul class="flex-1 flex hide-xs">
        <li class="mr-10">
          <router-link to="/boutique">
            Boutique
          </router-link>
        </li>
        <li>
          <router-link to="/admin">
            Admin
          </router-link>
        </li>
      </ul>
      <ul class="flex hide-xs">
        <li class="mr-10"><a>Inscription</a></li>
        <li><a>Connexion</a></li>
      </ul>
    </div>
    <div class="menu-xs-container">
      <Calc :open="state.open" @close="state.open = false" transparent />
      <svg
        @click="state.open = !state.open"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path
          fill="currentColor"
          d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"
        />
      </svg>
      <Transition>
        <ul @click="state.open = false" v-if="state.open" class="menu card">
          <li class="mr-10">
            <router-link to="/boutique">
              Boutique
            </router-link>
          </li>
          <li>
            <router-link to="/admin">
              Admin
            </router-link>
          </li>
          <li class="mr-10"><a>Inscription</a></li>
          <li><a>Connexion</a></li>
        </ul>
      </Transition>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/mixins';

header {
  background-color: var(--primary-1);
  color: var(--text-primary-color);

  svg {
    height: 1.5rem;
    width: 1.5rem;
    cursor: pointer;

    @include mixins.sm {
      display: none;
    }
  }

  a {
    cursor: pointer;

    img {
      width: 20px;
      margin-right: 5px;
    }

    .logo {
      font-weight: 700;
      font-size: 20px;
    }
  }

  .menu-xs-container {
    position: relative;
  }

  .menu {
    position: absolute;
    top: 20px;
    right: 0;
    color: var(--text-color);
    z-index: 2;
    user-select: none;

    li {
      padding: 10px;
    }
  }

  .v-enter-from,
  .v-leave-to {
    transform: translateY(-10px);
    opacity: 0;
  }

  .v-enter-active,
  .v-leave-active {
    transition: all 0.3s;
  }
}
</style>
