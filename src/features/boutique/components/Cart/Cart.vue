<script lang="ts" setup>
import type { ProductCartIntf } from '@/interfaces';
import { computed, reactive } from 'vue';
import CartProductList from './CartProductList.vue';
import Calc from '@/components/Calc.vue';

const state = reactive<{
  open: boolean;
}>({
  open: false,
});

const props = defineProps<{
  cart: ProductCartIntf[];
}>();

const emit = defineEmits<{
  (e: 'removeProductFromCart', productId: string): void;
}>();

const totalPrice = computed(() =>
  props.cart.reduce((acc, product) => acc + product.price * product.quantity, 0)
);
</script>

<template>
  <aside class="cart-container">
    <Transition mode="out-in">
      <div
        v-if="!state.open"
        @click="state.open = !state.open"
        class="cart-holder flex justify-center items-center"
      >
        <span class="tag">{{ cart.length }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path
            d="M171.7 191.1H404.3L322.7 35.07C316.6 23.31 321.2 8.821 332.9 2.706C344.7-3.409 359.2 1.167 365.3 12.93L458.4 191.1H544C561.7 191.1 576 206.3 576 223.1C576 241.7 561.7 255.1 544 255.1L492.1 463.5C484.1 492 459.4 512 430 512H145.1C116.6 512 91 492 83.88 463.5L32 255.1C14.33 255.1 0 241.7 0 223.1C0 206.3 14.33 191.1 32 191.1H117.6L210.7 12.93C216.8 1.167 231.3-3.409 243.1 2.706C254.8 8.821 259.4 23.31 253.3 35.07L171.7 191.1zM191.1 303.1C191.1 295.1 184.8 287.1 175.1 287.1C167.2 287.1 159.1 295.1 159.1 303.1V399.1C159.1 408.8 167.2 415.1 175.1 415.1C184.8 415.1 191.1 408.8 191.1 399.1V303.1zM271.1 303.1V399.1C271.1 408.8 279.2 415.1 287.1 415.1C296.8 415.1 304 408.8 304 399.1V303.1C304 295.1 296.8 287.1 287.1 287.1C279.2 287.1 271.1 295.1 271.1 303.1zM416 303.1C416 295.1 408.8 287.1 400 287.1C391.2 287.1 384 295.1 384 303.1V399.1C384 408.8 391.2 415.1 400 415.1C408.8 415.1 416 408.8 416 399.1V303.1z"
          />
        </svg>
      </div>
      <div v-else>
        <Calc :open="true" @close="state.open = false"/>
        <div class="p-20 flex flex-col card ml-20">
          <h2 class="mb-10">Panier</h2>
          <CartProductList
            @remove-product-from-cart="emit('removeProductFromCart', $event)"
            :cart="props.cart"
          />
          <button class="btn btn-success">
            Commander ({{ totalPrice.toLocaleString() }}€)
          </button>
        </div>
      </div>
    </Transition>
  </aside>
</template>

<style lang="scss" scoped>
.cart-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 2;
}

.cart-holder {
  position: relative;
  background-color: var(--primary-1);
  width: 50px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--primary-2);
  }

  .tag {
    position: absolute;
    top: 0;
    right: 0;
    width: 15px;
    font-size: 10px;
    line-height: 15px;
    text-align: center;
    vertical-align: middle;
    border-radius: 50%;
    background-color: var(--danger-1);
    color: var(--white);
  }

  svg {
    width: 25px;
    fill: var(--text-primary-color);
  }
}

.v-enter-from,
.v-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.2s;
}
</style>
