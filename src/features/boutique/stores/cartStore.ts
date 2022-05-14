import type { ProductIntf } from '@/shared/interfaces';
import { defineStore } from 'pinia';

interface CartState {
  cart: ProductIntf[];
}

export const useCart = defineStore('cart', {
  state: (): CartState => ({
    cart: [],
  }),
});
