import { defineStore } from 'pinia';
import type { ProductFormIntf, ProductIntf } from '@/shared/interfaces';
import { addProduct, deleteProduct, editProduct, fetchProducts } from '@/shared/services/product.service';

interface AdminProductState {
  products: ProductIntf[];
  isLoading: boolean;
}

export const useAdminProducts = defineStore('adminProduct', {
  state: (): AdminProductState => ({
    products: [],
    isLoading: false,
  }),
  actions: {
    async fetchProducts() {
      this.isLoading = true;
      const products = await fetchProducts()
      if (Array.isArray(products)) {
        this.products = products;
      } else {
        this.products = [products];
      }
      this.isLoading = false;
    },
    async deleteProduct(productId: string) {
      const productIndex = this.products.findIndex((p) => p._id === productId);
      if (productIndex !== -1) {
        await deleteProduct(productId);
        this.products.splice(productIndex, 1);
      }
    },
    async addProduct(productForm: ProductFormIntf) {
      const newProduct = await addProduct(productForm);
      if (newProduct) {
        this.products.push(newProduct);
      }
    },
    async editProduct(productId: string, productForm: ProductFormIntf) {
      const editedProduct = await editProduct(productId, productForm)
      if (editedProduct) {
        const stateProductIndex = this.products.findIndex(p => p._id === editedProduct._id);
        this.products[stateProductIndex] = editedProduct;
      }
    }
  },
});
