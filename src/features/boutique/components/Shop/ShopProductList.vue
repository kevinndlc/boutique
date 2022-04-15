<script lang="ts" setup>
import type { ProductIntf } from '@/interfaces';
import ShopProduct from './ShopProduct.vue'

defineProps<{
  products: ProductIntf[]
}>()

const emit = defineEmits<{
  (e: 'addProductToCart', productId: string): void
}>()

</script>

<template>
  <div class="grid p-20">
    <ShopProduct @add-product-to-cart="emit('addProductToCart', $event)" v-for="product of products" :product="product" :key="product._id" />
  </div>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
</style>