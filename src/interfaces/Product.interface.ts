import type { Category } from './Filters.interface';

export interface ProductIntf {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category: Category;
}
