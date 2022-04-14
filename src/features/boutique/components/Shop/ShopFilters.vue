<script lang="ts" setup>
import type { FiltersIntf, FilterUpdateIntf, Category } from '@/interfaces';

defineProps<{
  filters: FiltersIntf;
  nbrOfProducts: number;
}>();

const emit = defineEmits<{
  (e: 'updateFilter', filterUpdate: FilterUpdateIntf): void;
}>();
</script>

<template>
  <div class="p-20">
    <section class="mb-20">
      <h3 class="mb-10">Rechercher</h3>
      <input
        :value="filters.search"
        @input="emit('updateFilter', { search: ($event.target as HTMLInputElement).value })"
        type="text"
        placeholder="Macbook Pro..."
      />
    </section>
    <section class="mb-20">
      <h3 class="mb-10">Trier par prix</h3>
      <div
        class="mb-10"
        v-for="priceRange of ([[0, 10000], [800, 1000], [1000, 1500], [1500, 2000], [2000, 10000]] as [number, number][])"
      >
        <label>
          <input
            type="radio"
            @input="emit('updateFilter', { priceRange })"
            name="priceRange"
            :checked="filters.priceRange[0] === priceRange[0]"
          />
          {{
            priceRange[0] === 0
              ? 'Tous les prix'
              : priceRange[0] === 2000
              ? 'Plus de 2000€'
              : `Entre ${priceRange[0]} et ${priceRange[1]}€`
          }}
        </label>
      </div>
    </section>
    <section class="mb-20">
      <h3 class="mb-10">Trier par catégorie</h3>
      <p
        class="category"
        :class="{ selected: filters.category === category }"
        v-for="category in (['all', 'desktop', 'gamer', 'streaming'] as Category[])"
        @click="emit('updateFilter', { category })"
      >
        {{ category[0].toUpperCase() + category.slice(1) }}
      </p>
    </section>
    <small class="nbr-of-results mb-10">Nombre de résultats : {{ nbrOfProducts }}</small>
    <button class="btn btn-danger" @click="emit('updateFilter', {})">Supprimer les filtres</button>
  </div>
</template>

<style lang="scss" scoped>
.shop-filter {
  flex: 0 0 200px;
}

.category {
  font-size: 14px;
  line-height: 18px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &.selected {
    font-weight: 700;
    color: var(--primary-1)
  }
}

.nbr-of-results {
  display: block;
}
</style>
