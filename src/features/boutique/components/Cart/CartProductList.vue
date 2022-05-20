<script lang="ts" setup>
import type { ProductCartIntf } from '@/shared/interfaces';
import CartProduct from './CartProduct.vue';

defineProps<{
  cart: ProductCartIntf[];
}>();

const emit = defineEmits<{
  (e: 'removeProductFromCart', productId: string): void;
}>();
</script>

<template>
  <div class="flex flex-col">
    <CartProduct
      @remove-product-from-cart="emit('removeProductFromCart', $event)"
      v-for="product of cart"
      :product="product"
      :key="product._id"
    />
  </div>
</template>

<style lang="scss" scoped></style>
