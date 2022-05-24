<script lang="ts" setup>
import type { ProductIntf } from '@/shared/interfaces';
import { ref, watch } from 'vue';
import ShopProduct from './ShopProduct.vue';

const props = defineProps<{
  products: ProductIntf[];
  page: number,
  moreResults: boolean;
}>();

const emit = defineEmits<{
  (e: 'addProductToCart', productId: string): void;
  (e: 'incPage'): void;
}>();

const scrollableDiv = ref<HTMLDivElement | null>(null);

watch(() => props.page, () => {
  if (props.page === 1) {
    scrollableDiv.value?.scrollTo(0, 0);
  }
});
</script>

<template>
  <div ref="scrollableDiv" class="flex flex-col p-20">
    <div class="grid mb-20">
      <ShopProduct
        @add-product-to-cart="emit('addProductToCart', $event)"
        v-for="product of products"
        :product="product"
        :key="product._id"
      />
    </div>
    <div class="flex items-center justify-center">
      <button
        v-if="moreResults && products.length"
        @click="emit('incPage')"
        class="btn btn-primary"
      >
        Charger + de produits
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
</style>
