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

const DEFAULT_FILTERS: FiltersIntf = {
  search: '',
  priceRange: [0, 10000],
  category: 'all',
};

const state = reactive<{
  products: ProductIntf[];
  cart: ProductCartIntf[];
  filters: FiltersIntf;
  page: number;
  isLoading: boolean;
  moreResults: boolean;
}>({
  products: [],
  cart: [],
  filters: { ...DEFAULT_FILTERS },
  page: 1,
  isLoading: false,
  moreResults: true,
});

provide(pageKey, toRef(state, 'page'));

watch(() => state.filters.category && state.filters.priceRange, () => {
  state.products = [];
  state.page = 1;
});

watchEffect(async () => {
  state.isLoading = true;
  const products = await fetchProducts(state.filters, state.page);
  if (Array.isArray(products)) {
    state.products = [...state.products, ...products];
    if (products.length < 20) {
      state.moreResults = false;
    } else {
      state.moreResults = true;
    }
  } else {
    state.products = [...state.products, products];
  }
  state.isLoading = false;
});

const addProductToCart = (productId: string): void => {
  const product = state.products.find((product) => product._id === productId);
  if (product) {
    const productInCart = state.cart.find(
      (product) => product._id === productId
    );
    if (productInCart) {
      productInCart.quantity++;
    } else {
      state.cart.push({ ...product, quantity: 1 });
    }
  }
};

const removeProductFromCart = (productId: string): void => {
  const productFromCart = state.cart.find(
    (product) => product._id === productId
  );
  if (productFromCart) {
    if (productFromCart.quantity === 1) {
      state.cart = state.cart.filter((product) => product._id !== productId);
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
    state.filters = { ...DEFAULT_FILTERS };
  }
};

const filteredProducts = computed(() => {
  return state.products.filter((product) => {
    if (
      product.title.toLowerCase().startsWith(state.filters.search.toLowerCase())
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
