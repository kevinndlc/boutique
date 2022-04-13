<script lang="ts" setup>
import type { ProductIntf } from '@/interfaces';
import ShopProductList from './ShopProductList.vue'

defineProps<{
  products: ProductIntf[]
}>()

const emit = defineEmits<{
  (e: 'addProductToCart', productId: number): void
}>()

</script>

<template>
  <main>
    <ShopProductList @add-product-to-cart="emit('addProductToCart', $event)" :products="products" />
  </main>
</template>

<style lang="scss" scoped>

</style>