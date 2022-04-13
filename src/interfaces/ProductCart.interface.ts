import type { ProductIntf } from "./Product.interface";

export interface ProductCartIntf extends ProductIntf {
  quantity: number;
}