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

// watchEffect(async () => {
//   state.isLoading = true;
//   const products = await fetchProducts(state.filters, state.page);
//   if (Array.isArray(products)) {
//     state.products = [...state.products, ...products];
//     if (products.length < 20) {
//       state.moreResults = false;
//     } else {
//       state.moreResults = true;
//     }
//   } else {
//     state.products = [...state.products, products];
//   }
//   state.isLoading = false;
// });

// const updateFilter = (filterUpdate: FilterUpdateIntf): void => {
//   if (filterUpdate.search !== undefined) {
//     state.filters.search = filterUpdate.search;
//   } else if (filterUpdate.priceRange) {
//     state.filters.priceRange = filterUpdate.priceRange;
//   } else if (filterUpdate.category) {
//     state.filters.category = filterUpdate.category;
//   } else {
//     state.filters = { ...DEFAULT_FILTERS };
//   }
// };

// const filteredProducts = computed(() => {
//   return state.products.filter((product) => {
//     if (
//       product.title.toLowerCase().startsWith(state.filters.search.toLowerCase())
//     ) {
//       return true;
//     } else {
//       return false;
//     }
//   });
// });