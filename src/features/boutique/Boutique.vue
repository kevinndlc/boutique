<script setup lang="ts">
import Shop from './components/Shop/Shop.vue';
import Cart from './components/Cart/Cart.vue';

import data from '../../data/products';

import { computed, reactive, watchEffect } from 'vue';
import type { ProductIntf, ProductCartIntf, FiltersIntf, FilterUpdateIntf } from '../../interfaces';

const DEFAULT_FILTERS: FiltersIntf = {
  search: '',
  priceRange: [0, 10000],
  category: 'all',
}

const state = reactive<{
  products: ProductIntf[];
  cart: ProductCartIntf[];
  filters: FiltersIntf;
}>({
  products: data,
  cart: [],
  filters: { ...DEFAULT_FILTERS },
});

const addProductToCart = (productId: number): void => {
  const product = state.products.find((product) => product.id === productId);
  if (product) {
    const productInCart = state.cart.find(
      (product) => product.id === productId
    );
    if (productInCart) {
      productInCart.quantity++;
    } else {
      state.cart.push({ ...product, quantity: 1 });
    }
  }
};

const removeProductFromCart = (productId: number): void => {
  const productFromCart = state.cart.find(
    (product) => product.id === productId
  );
  if (productFromCart) {
    if (productFromCart.quantity === 1) {
      state.cart = state.cart.filter((product) => product.id !== productId);
    } else {
      productFromCart.quantity--;
    }
  }
};

const updateFilter = (filterUpdate: FilterUpdateIntf): void => {
  if (filterUpdate.search !== undefined) {
    state.filters.search = filterUpdate.search;
  } else if (filterUpdate.priceRange) {
    state.filters.priceRange = filterUpdate.priceRange;
  } else if (filterUpdate.category) {
    state.filters.category = filterUpdate.category;
  } else {
    state.filters = { ...DEFAULT_FILTERS }
  }
}

const filteredProducts = computed(() => {
  return state.products.filter((product) => {
    if (
      product.title
        .toLowerCase()
        .startsWith(state.filters.search.toLowerCase()) &&
      product.price >= state.filters.priceRange[0] &&
      product.price <= state.filters.priceRange[1] &&
      (product.category === state.filters.category ||
        state.filters.category === 'all')
    ) {
      return true;
    } else {
      return false;
    }
  });
});

const cartEmpty = computed(() => state.cart.length === 0);

const appElement = document.getElementById('app') as HTMLDivElement;
watchEffect(() => {
  if (cartEmpty.value) {
    appElement.classList.add('gridEmpty');
  } else {
    appElement.classList.remove('gridEmpty');
  }
});
</script>

<template>
  <div class="boutique-container"
  :class="{ 'grid-empty': cartEmpty }">
    <Shop
      :products="filteredProducts"
      :filters="state.filters"
      @update-filter="updateFilter"
      @add-product-to-cart="addProductToCart"
      class="shop"
    />
    <Cart
      v-if="!cartEmpty"
      @remove-product-from-cart="removeProductFromCart"
      :cart="state.cart"
      class="cart"
    />
  </div>
</template>

<style scoped lang="scss">
  .boutique-container {
    display: grid;
    grid-template-columns: 80% 20%;

    &.grid-empty {
      grid-template-columns: 100%;
    }

    .cart {
      background-color: var(--white);
      border-left: var(--border);
    }
  }
</style>