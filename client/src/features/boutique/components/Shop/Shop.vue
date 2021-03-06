<script lang="ts" setup>
import type { FiltersIntf, FilterUpdateIntf, ProductIntf } from '@/shared/interfaces';
import ShopProductList from './ShopProductList.vue';
import ShopFilters from './ShopFilters.vue';
import { reactive } from 'vue';
import Calc from '@/components/Calc.vue';

const state = reactive<{
  open: boolean;
  isMobile: boolean;
}>({
  open: !matchMedia('(max-width: 575px)').matches,
  isMobile: matchMedia('(max-width: 575px)').matches
});

defineProps<{
  products: ProductIntf[];
  filters: FiltersIntf;
  moreResults: boolean;
  page: number;
}>();

const emit = defineEmits<{
  (e: 'addProductToCart', productId: string): void;
  (e: 'updateFilter', updateFilter: FilterUpdateIntf): void;
  (e: 'incPage'): void;
}>();
</script>

<template>
  <div class="shop flex">
    <Calc :open="state.isMobile && state.open" @close="state.open = false" transparent/>
    <Transition>
      <ShopFilters
        v-if="state.open"
        :filters="filters"
        :nbr-of-products="products.length"
        @update-filter="emit('updateFilter', $event)"
        class="shop-filter"
      />
    </Transition>
    <div class="flex flex-col flex-1">
      <button @click="state.open = !state.open" class="btn btn-primary flex justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"
          />
        </svg>
        <span>Rechercher</span>
      </button>
      <ShopProductList
        class="scrollable flex-1"
        @add-product-to-cart="emit('addProductToCart', $event)"
        @inc-page="emit('incPage')"
        :products="products"
        :more-results="moreResults"
        :page="page"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/mixins';

button {
  margin-inline: 20px;
  margin-block: 20px;

  @include mixins.sm {
    display: none;
  }
}

svg {
  width: 1rem;
  fill: currentColor;
  margin-right: 10px;
}

.shop {
  align-items: flex-start;
  position: relative;
}

.shop-filter {
  flex: 0 0 200px;

  @include mixins.xs {
    position: absolute;
    top: 0;
    left: 0;
    background-color: white;
    z-index: 2;
  }
}

.v-enter-from,
.v-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: transform 0.2s, opacity 0.2s;
}

.scrollable {
  overflow-y: auto;
  height: calc(100vh - 96px);
}
</style>
