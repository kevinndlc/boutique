import type { FiltersIntf, ProductIntf } from "@/shared/interfaces";
import { defineStore } from "pinia";

interface ProductState {
  products: ProductIntf[],
  filters: FiltersIntf,
  page: number,
  isLoading: boolean,
  moreResults: boolean
}

const DEFAULT_FILTERS: FiltersIntf = {
  search: '',
  priceRange: [0, 10000],
  category: 'all',
};

export const useProducts = defineStore('products', {
  state: (): ProductState => ({
    products: [],
    filters: { ...DEFAULT_FILTERS },
    page: 1,
    isLoading: true,
    moreResults: true
  })
})