<script setup lang="ts">
import { useAdminProducts } from "../stores/adminProductStore";
import { useRouter } from 'vue-router';

const adminProductStore = useAdminProducts();
adminProductStore.fetchProducts();

async function tryDeleteProduct(productId: string) {
  adminProductStore.deleteProduct(productId);
}

const router = useRouter();

function editProduct(productId: string) {
  router.push({ name: 'edit', params: { productId } });
}
</script>

<template>
  <div class="container card">
    <h2>Liste des produits</h2>
    <h3 v-if="adminProductStore.isLoading">Chargement...</h3>
    <ul v-else>
      <li
        class="flex items-center"
        v-for="product of adminProductStore.products"
        :key="product._id"
      >
        <span class="flex-1">{{ product.title }}</span>
        <button @click="editProduct(product._id)" class="btn btn-primary mr-10">
          Modifier
        </button>
        <button @click="tryDeleteProduct(product._id)" class="btn btn-danger">
          Supprimer
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
}

li {
  border: var(--border);
  border-radius: var(--border-radius);
  padding: 5px 15px;
  margin-bottom: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--gray-1);
  }
}
</style>
