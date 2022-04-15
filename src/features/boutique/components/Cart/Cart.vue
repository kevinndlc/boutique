<script lang="ts" setup>
import type { ProductCartIntf } from "@/interfaces";
import { computed } from "vue";
import CartProductList from "./CartProductList.vue";

const props = defineProps<{
  cart: ProductCartIntf[]
}>()

const emit = defineEmits<{
  (e: 'removeProductFromCart', productId: string): void
}>()

const totalPrice = computed(() => props.cart.reduce((acc, product) => acc + product.price * product.quantity, 0))

</script>

<template>
  <aside class="p-20">
    <div class="flex flex-col">
      <h2 class="mb-10">Panier</h2>
      <CartProductList @remove-product-from-cart="emit('removeProductFromCart', $event)" :cart="props.cart" />
      <button class="btn btn-success">Commander ({{ totalPrice.toLocaleString() }}€)</button>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
aside {
  div {
    position: sticky;
    top: 10px;
  }
}
</style>