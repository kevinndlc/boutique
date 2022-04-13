<script setup lang="ts">
import TheHeader from '@/components/Header.vue';
import Shop from '@/components/Shop/Shop.vue';
import Cart from '@/components/Cart/Cart.vue';
import TheFooter from '@/components/Footer.vue';

import data from './data/products';

import { computed, reactive, watchEffect } from 'vue';
import type { ProductIntf, ProductCartIntf } from './interfaces';

const state = reactive<{
  products: ProductIntf[];
  cart: ProductCartIntf[];
}>({
  products: data,
  cart: [],
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

const cartEmpty = computed(() => state.cart.length === 0)

const appElement = document.getElementById('app') as HTMLDivElement
watchEffect(() => {
  if (cartEmpty.value) {
    appElement.classList.add('gridEmpty')
  } else {
    appElement.classList.remove('gridEmpty')
  }
})
</script>

<template>
  <TheHeader class="header" />
  <Shop
    :products="state.products"
    @add-product-to-cart="addProductToCart"
    class="shop"
  />
  <Cart
    v-if="!cartEmpty"
    @remove-product-from-cart="removeProductFromCart"
    :cart="state.cart"
    class="cart"
  />
  <TheFooter class="footer" />
</template>

<style lang="scss">
@import './assets/scss/base.scss';
@import './assets/scss/debug.scss';

#app {
  min-height: 100vh;
  display: grid;
  grid-template-areas:
    'header header'
    'shop cart'
    'footer footer';
  grid-template-columns: 75% 25%;
  grid-template-rows: auto 1fr auto;

  &.gridEmpty {
    grid-template-areas:
    'header'
    'shop'
    'footer';
  grid-template-columns: 100%
  }

  .header {
    grid-area: header;
  }

  .shop {
    grid-area: shop;
  }

  .cart {
    grid-area: cart;
    border-left: var(--border);
    background-color: var(--white);
  }

  .footer {
    grid-area: footer;
  }
}
</style>
