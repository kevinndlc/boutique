<script setup lang="ts">
import TheHeader from '@/components/Header.vue';
import TheFooter from '@/components/Footer.vue';
import { seed40Products } from './data/seed';

// seed40Products('shop')
</script>

<template>
  <TheHeader class="header" />
  <main class="main">
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <Suspense>
          <Component :is="Component" />
        </Suspense>
      </template>
    </router-view>
    
  </main>
  <TheFooter class="footer hide-xs" />
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
