import type { Category } from './type';

export interface ProductIntf {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category: Category;
}
