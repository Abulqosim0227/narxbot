<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const categories = [
  { id: 'phones', name: 'Telefonlar', icon: '\uD83D\uDCF1' },
  { id: 'laptops', name: 'Noutbuklar', icon: '\uD83D\uDCBB' },
  { id: 'tvs', name: 'Televizorlar', icon: '\uD83D\uDCFA' },
  { id: 'appliances', name: 'Maishiy texnika', icon: '\uD83C\uDFE0' },
  { id: 'headphones', name: 'Quloqchinlar', icon: '\uD83C\uDFA7' },
  { id: 'watches', name: 'Soatlar', icon: '\u231A' },
]

function selectCategory(categoryId: string) {
  router.push({ name: 'search', query: { q: categoryId } })
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
        @click="selectCategory(category.id)"
      >
        <span class="text-3xl">{{ category.icon }}</span>
        <span class="text-xs font-medium text-gray-600">{{ category.name }}</span>
      </button>
    </div>
  </section>
</template>
