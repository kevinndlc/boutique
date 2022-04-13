import type { ProductIntf } from "./product.interface";

export interface ProductCartIntf extends ProductIntf {
  quantity: number;
}