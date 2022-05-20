<script setup lang="ts">
import Shop from './components/Shop/Shop.vue';
import Cart from './components/Cart/Cart.vue';

import { useProducts } from './stores/productStore';
import { useCart } from './stores/cartStore';
import type { FilterUpdateIntf } from '@/shared/interfaces';

const productStore = useProducts();
productStore.fetchProducts();
const cartStore = useCart();

function updateFilter(filterUpdate: FilterUpdateIntf) {
  productStore.updateFilter(filterUpdate);
}

function incPage() {
  productStore.incPage();
}

function addProductToCart(productId: string) {
  cartStore.addProductToCart(productId);
}

function removeProductFromCart(productId: string) {
  cartStore.removeProductFromCart(productId);
}

productStore.$onAction(({ name, after, args }) => {
  if (name === 'updateFilter' && !args[0].search) {
    after(() => {
      productStore.page = 1;
      productStore.products = [];
      productStore.fetchProducts();
    });
  } else if (name === 'incPage') {
    after(() => {
      productStore.fetchProducts();
    });
  }
});
</script>

<template>
  <div>
    <Shop
      :products="productStore.filteredProducts"
      :filters="productStore.filters"
      :more-results="productStore.moreResults"
      :page="productStore.page"
      @update-filter="updateFilter"
      @add-product-to-cart="addProductToCart"
      @inc-page="incPage"
    />
    <Cart
      v-if="!cartStore.cartEmpty"
      @remove-product-from-cart="removeProductFromCart"
      :cart="cartStore.cart"
    />
  </div>
</template>
