<script setup lang="ts">
import { useRouter } from 'vue-router'
import SearchBar from '../components/SearchBar.vue'
import CategoryGrid from '../components/CategoryGrid.vue'

const router = useRouter()

function handleSearch(query: string) {
  router.push({ name: 'search', query: { q: query } })
}
</script>

<template>
  <div class="px-4 pt-6">
    <!-- Header -->
    <header class="text-center mb-8">
      <h1 class="text-3xl font-bold text-primary-600 mb-1">NarxBot</h1>
      <p class="text-sm text-gray-500">Eng yaxshi narxlarni toping</p>
    </header>

    <SearchBar @search="handleSearch" />

    <CategoryGrid />

    <!-- How it works -->
    <section class="mt-8">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Qanday ishlaydi?</h2>
      <div class="flex flex-col gap-3">
        <div class="card flex items-center gap-4 p-4">
          <span class="text-2xl">&#x1F50D;</span>
          <div>
            <h3 class="text-sm font-semibold text-gray-900">Qidirish</h3>
            <p class="text-xs text-gray-500">Mahsulot nomini yozing</p>
          </div>
        </div>
        <div class="card flex items-center gap-4 p-4">
          <span class="text-2xl">&#x2696;&#xFE0F;</span>
          <div>
            <h3 class="text-sm font-semibold text-gray-900">Taqqoslash</h3>
            <p class="text-xs text-gray-500">Barcha do'konlar narxlari</p>
          </div>
        </div>
        <div class="card flex items-center gap-4 p-4">
          <span class="text-2xl">&#x1F4B0;</span>
          <div>
            <h3 class="text-sm font-semibold text-gray-900">Tejash</h3>
            <p class="text-xs text-gray-500">Eng arzon joydan oling</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
