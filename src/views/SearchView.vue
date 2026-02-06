<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSearchStore } from '../stores/search'
import SearchBar from '../components/SearchBar.vue'
import ProductCard from '../components/ProductCard.vue'

const route = useRoute()
const router = useRouter()
const searchStore = useSearchStore()

function handleSearch(query: string) {
  router.push({ name: 'search', query: { q: query } })
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('uz-UZ').format(price) + " so'm"
}

onMounted(() => {
  const q = route.query.q as string
  if (q) {
    searchStore.search({ q })
  }
})

watch(() => route.query.q, (newQuery) => {
  if (newQuery) {
    searchStore.search({ q: newQuery as string })
  }
})
</script>

<template>
  <div class="px-4 pt-4">
    <SearchBar :initial-value="searchStore.query" @search="handleSearch" />

    <!-- Loading -->
    <div v-if="searchStore.loading" class="flex flex-col items-center justify-center py-16">
      <div class="spinner"></div>
      <p class="mt-4 text-sm text-gray-400">Qidirilmoqda...</p>
    </div>

    <!-- Error -->
    <div v-else-if="searchStore.error" class="text-center py-10">
      <p class="text-red-500 text-sm">{{ searchStore.error }}</p>
    </div>

    <!-- Results -->
    <div v-else-if="searchStore.results">
      <p class="text-sm text-gray-500 mb-3">{{ searchStore.results.total }} ta topildi</p>

      <!-- Cheapest banner -->
      <div
        v-if="searchStore.results.cheapest"
        class="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 mb-4"
      >
        <span class="text-lg">&#x1F3F7;&#xFE0F;</span>
        <span class="text-sm text-emerald-700">Eng arzon:</span>
        <span class="text-sm font-semibold text-emerald-700">{{ searchStore.results.cheapest.store.name }}</span>
        <span class="ml-auto text-sm font-bold text-emerald-700">{{ formatPrice(searchStore.results.cheapest.current_price) }}</span>
      </div>

      <!-- 2-column product grid -->
      <div class="grid grid-cols-2 gap-3">
        <ProductCard
          v-for="product in searchStore.results.products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>
