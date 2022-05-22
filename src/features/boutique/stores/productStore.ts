import type { FiltersIntf, FilterUpdateIntf, ProductIntf } from '@/shared/interfaces';
import { fetchProductsWithFilter } from '@/shared/services/product.service';
import { defineStore } from 'pinia';

interface ProductState {
  products: ProductIntf[];
  filters: FiltersIntf;
  page: number;
  isLoading: boolean;
  moreResults: boolean;
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
    moreResults: true,
  }),
  getters: {
    filteredProducts(state) {
      return state.products.filter((product) =>
        product.title
          .toLowerCase()
          .startsWith(state.filters.search.toLowerCase())
      );
    },
  },
  actions: {
    async fetchProducts() {
      this.isLoading = true;
      const products = await fetchProductsWithFilter(this.filters, this.page);
      if (Array.isArray(products)) {
        this.products = [...this.products, ...products];
        if (products.length < 20) {
          this.moreResults = false;
        } else {
          this.moreResults = true;
        }
      } else {
        this.products = [...this.products, products];
      }
      this.isLoading = false;
    },
    updateFilter(filterUpdate: FilterUpdateIntf) {
      if (filterUpdate.search !== undefined) {
        this.filters.search = filterUpdate.search;
      } else if (filterUpdate.priceRange) {
        this.filters.priceRange = filterUpdate.priceRange;
      } else if (filterUpdate.category) {
        this.filters.category = filterUpdate.category;
      } else {
        this.filters = { ...DEFAULT_FILTERS };
      }
    },
    incPage() {
      this.page++;
    }
  },
});
