<script lang="ts" setup>
import type { FiltersIntf, FilterUpdateIntf, ProductIntf } from '@/interfaces';
import ShopProductList from './ShopProductList.vue';
import ShopFilters from './ShopFilters.vue';

defineProps<{
  products: ProductIntf[];
  filters: FiltersIntf;
}>();

const emit = defineEmits<{
  (e: 'addProductToCart', productId: number): void;
  (e: 'updateFilter', updateFilter: FilterUpdateIntf): void;
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
      class="shop-product-list flex-1"
      @add-product-to-cart="emit('addProductToCart', $event)"
      :products="products"
    />
  </div>
</template>

<style lang="scss" scoped>
.shop {
  align-items: flex-start;
}

.shop-product-list {
  overflow-y: auto;
}
</style>
