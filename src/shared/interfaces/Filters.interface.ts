import type { Category } from "./type";

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