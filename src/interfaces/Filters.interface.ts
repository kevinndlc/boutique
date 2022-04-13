export type Category = 'gamer' | 'desktop' | 'streaming' | 'all'

export interface FiltersIntf {
  search: string,
  priceRange: [number, number],
  category: Category
}

export interface FilterUpdateIntf {
  search?: string;
  priceRange?: [number, number];
  category?: Category;
}