import type { FiltersIntf, ProductIntf } from '@/interfaces';
import { ref, type Ref } from 'vue';

const BASE_URL = 'https://restapi.fr/api/shop'

export async function fetchProducts(
  filter: FiltersIntf,
  page: number
): Promise<ProductIntf[] | ProductIntf> {
  const query = new URLSearchParams();

  if (filter.category !== 'all') {
    query.append('category', filter.category)
  }
  query.append('price', `$gte:${ filter.priceRange[0] }`)
  query.append('price', `$lte:${ filter.priceRange[1] }`)
  query.append('limit', 20 + '')
  if (page !== 1) {
    query.append('skip', (page - 1) * 20 + '');
  }

  const products = await (await fetch(`${ BASE_URL }?${ query }`)).json();

  return products;
}

export function useFetchProducts(): { products: Ref<ProductIntf[] | null>, loading: Ref<boolean>, error: Ref<any> } {
  const products = ref<ProductIntf[] | null>(null);
  const loading = ref<boolean>(true);
  const error = ref<any>(null);

  (async () => {
    try {
      products.value = await (await fetch(BASE_URL)).json()
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  })()

  return {
    products,
    loading,
    error
  }
} 