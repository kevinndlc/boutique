<script lang="ts" setup>
import type { ProductCartIntf } from '@/shared/interfaces';

defineProps<{
  product: ProductCartIntf
}>()

const emit = defineEmits<{
  (e: 'removeProductFromCart', productId: string): void
}>()

</script>

<template>
  <div class="product p-10 mb-10 flex flex-row items-center">
    <strong class="mr-10">{{ product.title }}</strong>
    <span class="flex-1 mr-10">x{{ product.quantity }}</span>
    <span class="mr-10">Prix: {{ product.price.toLocaleString() }}€</span>
    <button @click="emit('removeProductFromCart', product._id)" class="btn btn-danger">X</button>
  </div>
</template>

<style lang="scss" scoped>
.product {
  border: var(--border);
  border-radius: var(--border-radius);
  background-color: var(--gray-1);
}
</style>