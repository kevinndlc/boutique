import type { FiltersIntf, ProductIntf } from '@/interfaces';

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

  const products = await (await fetch(`https://restapi.fr/api/shop?${ query }`)).json();

  return products;
}
