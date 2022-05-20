<script setup lang="ts">
import Shop from './components/Shop/Shop.vue';
import Cart from './components/Cart/Cart.vue';

import { computed, isReactive, isRef, provide, reactive, toRef, watch, watchEffect } from 'vue';
import type {
  ProductIntf,
  ProductCartIntf,
  FiltersIntf,
  FilterUpdateIntf,
} from '../../interfaces';
import { fetchProducts } from '@/shared/services/product.service';
import { pageKey } from '@/shared/injectionKeys/pageKey';
import { useProducts } from './stores/productStore';
import { useCart } from './stores/cartStore';

const productStore = useProducts()
const cartStore = useCart()

// watch(() => state.filters.category && state.filters.priceRange, () => {
//   state.products = [];
//   state.page = 1;
// });


// const appElement = document.getElementById('app') as HTMLDivElement;
// watchEffect(() => {
//   if (cartEmpty.value) {
//     appElement.classList.add('gridEmpty');
//   } else {
//     appElement.classList.remove('gridEmpty');
//   }
// });
</script>

<template>
  <div>
    <Shop
      :products="filteredProducts"
      :filters="state.filters"
      :more-results="state.moreResults"
      @update-filter="updateFilter"
      @add-product-to-cart="addProductToCart"
      @inc-page="state.page++"
    />
    <Cart
      v-if="!cartEmpty"
      @remove-product-from-cart="removeProductFromCart"
      :cart="state.cart"
    />
  </div>
</template>
