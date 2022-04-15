<script lang="ts" setup>
import type { ProductIntf } from '@/interfaces';

defineProps<{
  product: ProductIntf
}>()

const emit = defineEmits<{
  (e: 'addProductToCart', productId: string): void
}>()

</script>

<template>
  <div class="product flex flex-col">
    <img :src="product.image" alt="Macbook Pro" class="product-image" />
    <div class="p-10 flex flex-col">
      <h4>{{ product.title }}</h4>
      <p>{{ product.description }}</p>
      <div class="flex items-center test">
        <strong class="flex-1">Prix: {{ product.price.toLocaleString() }}€</strong>
        <button @click="emit('addProductToCart', product._id)" class="btn btn-primary">Ajouter au panier</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product {
  background-color: var(--white);
  border: var(--border);
  border-radius: var(--border-radius);
  height: 100%;

  &-image {
    object-fit: contain;
    object-position: center;
    height: 200px;
  }

  .test {
    margin-top: auto;
  }
}
</style>
