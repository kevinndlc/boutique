<script setup lang="ts">
import { deleteProduct, useFetchProducts } from '@/shared/services/product.service';
import { useRouter } from 'vue-router';

const { products, loading, error } = useFetchProducts();
const router = useRouter()

async function tryDeleteProduct(productId: string) {
  await deleteProduct(productId);
  products.value = products.value!.filter(p => p._id !== productId)
}

function editProduct(productId: string) {
  router.push({ name: "edit", params: { productId } });
}
</script>

<template>
  <div class="container card">
    <h2>Liste des produits</h2>
    <h3 v-if="error">Oups, une erreur s'est produite</h3>
    <h3 v-else-if="loading">Chargement...</h3>
    <ul v-else>
      <li
        class="flex items-center"
        v-for="product of products"
        :key="product._id"
      >
        <span class="flex-1">{{ product.title }}</span>
        <button @click="editProduct(product._id)" class="btn btn-primary mr-10">Modifier</button>
        <button @click="tryDeleteProduct(product._id)" class="btn btn-danger">Supprimer</button>
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
