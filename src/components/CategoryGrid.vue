<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const categories = [
  { query: 'telefon', name: 'Telefonlar', icon: '\uD83D\uDCF1' },
  { query: 'noutbuk', name: 'Noutbuklar', icon: '\uD83D\uDCBB' },
  { query: 'televizor', name: 'Televizorlar', icon: '\uD83D\uDCFA' },
  { query: 'konditsioner', name: 'Konditsioner', icon: '\u2744\uFE0F' },
  { query: 'naushnik', name: 'Quloqchinlar', icon: '\uD83C\uDFA7' },
  { query: 'soat', name: 'Soatlar', icon: '\u231A' },
]

function selectCategory(searchQuery: string) {
  router.push({ name: 'search', query: { q: searchQuery } })
}
</script>

<template>
  <section class="mb-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Kategoriyalar</h2>
    <div class="grid grid-cols-3 gap-3">
      <button
        v-for="category in categories"
        :key="category.id"
        class="card flex flex-col items-center gap-2 py-4 px-3 active:scale-95 transition-transform"
        @click="selectCategory(category.query)"
      >
        <span class="text-3xl">{{ category.icon }}</span>
        <span class="text-xs font-medium text-gray-600">{{ category.name }}</span>
      </button>
    </div>
  </section>
</template>
