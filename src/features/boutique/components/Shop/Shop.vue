<script lang="ts" setup>
import type { FiltersIntf, FilterUpdateIntf, ProductIntf } from '@/interfaces';
import ShopProductList from './ShopProductList.vue';
import ShopFilters from './ShopFilters.vue';

defineProps<{
  products: ProductIntf[];
  filters: FiltersIntf;
  moreResults: boolean
}>();

const emit = defineEmits<{
  (e: 'addProductToCart', productId: string): void;
  (e: 'updateFilter', updateFilter: FilterUpdateIntf): void;
  (e: 'incPage'): void;
}>();
</script>

<template>
  <div class="shop flex">
    <ShopFilters
      :filters="filters"
      :nbr-of-products="products.length"
      @update-filter="emit('updateFilter', $event)"
      class="shop-filter"
    />
    <ShopProductList
      class="scrollable flex-1"
      @add-product-to-cart="emit('addProductToCart', $event)"
      @inc-page="emit('incPage')"
      :products="products"
      :more-results="moreResults"
    />
  </div>
</template>

<style lang="scss" scoped>
.shop {
  align-items: flex-start;
}

.scrollable {
  overflow-y: auto;
  height: calc(100vh - 96px);
}
</style>
