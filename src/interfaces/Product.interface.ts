import type { Category } from './type';

export interface ProductIntf {
  _id: string;
  createdAt: string;
  title: string;
  image: string;
  price: number;
  description: string;
  category: Category;
}

export interface ProductFormIntf {
  title: string;
  image: string;
  price: number;
  description: string;
  category: Category;
}
