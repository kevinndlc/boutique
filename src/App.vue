<script setup lang="ts">
import TheHeader from '@/components/Header.vue';
import TheFooter from '@/components/Footer.vue';
import Boutique from '@/features/boutique/Boutique.vue';
import Admin from '@/features/admin/Admin.vue';
import { reactive, type Component as C } from 'vue';
import type { Page } from './interfaces';
import { seed40Products } from './data/seed';

// seed40Products('shop')

const state = reactive<{
  page: Page
}>({
  page: 'Boutique'
})

const pages: { [s: string]: C } = {
  Boutique,
  Admin
}

const navigate = (page: Page): void => {
  state.page = page
}
</script>

<template>
  <TheHeader @navigate="navigate" :page="state.page" class="header" />
  <main class="main">
    <Suspense>
      <Component :is="pages[state.page]" />
    </Suspense>
  </main>
  <TheFooter class="footer" />
</template>

<style lang="scss">
@import './assets/scss/base.scss';
@import './assets/scss/debug.scss';

#app {
  height: 100vh;
  display: grid;
  grid-template-areas:
    'header'
    'content'
    'footer';
  grid-template-rows: 48px 1fr 48px;

  .header {
    grid-area: header;
  }

  .main {
    grid-area: content;
  }

  .footer {
    grid-area: footer;
  }
}
</style>
