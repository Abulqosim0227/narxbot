<script setup lang="ts">
import { useFavoritesStore } from '../stores/favorites'
import ProductCard from '../components/ProductCard.vue'

const favoritesStore = useFavoritesStore()
</script>

<template>
  <div class="px-4 pt-4">
    <h1 class="text-2xl font-bold text-gray-900 mb-5">
      Sevimlilar
      <span class="text-lg font-normal text-gray-400">({{ favoritesStore.favorites.length }})</span>
    </h1>

    <!-- Empty state -->
    <div v-if="favoritesStore.favorites.length === 0" class="text-center py-20">
      <span class="text-5xl block mb-4">&#x1F49D;</span>
      <p class="text-gray-500 mb-2">Sevimlilar bo'sh</p>
      <p class="text-sm text-gray-400">
        Mahsulotni sevimlilarga qo'shish uchun<br />
        qidiruv natijalarida yurak tugmasini bosing
      </p>
    </div>

    <!-- 2-column grid -->
    <div v-else class="grid grid-cols-2 gap-3">
      <ProductCard
        v-for="product in favoritesStore.favorites"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>
