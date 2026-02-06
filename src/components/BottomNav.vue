<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFavoritesStore } from '../stores/favorites'

const route = useRoute()
const router = useRouter()
const favoritesStore = useFavoritesStore()

const favCount = computed(() => favoritesStore.favorites.length)

const tabs = [
  { name: 'home', label: 'Bosh sahifa', path: '/' },
  { name: 'search', label: 'Qidirish', path: '/search' },
  { name: 'favorites', label: 'Sevimlilar', path: '/favorites' },
]

function isActive(tab: { name: string; path: string }): boolean {
  if (tab.name === 'home') return route.path === '/'
  return route.path.startsWith(tab.path)
}

function navigate(tab: { path: string }) {
  router.push(tab.path)
}
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white shadow-bottom-nav z-50">
    <div class="flex items-center justify-around h-16 max-w-lg mx-auto">
      <button
        v-for="tab in tabs"
        :key="tab.name"
        class="flex flex-col items-center justify-center flex-1 h-full transition-colors relative"
        :class="isActive(tab) ? 'text-primary-600' : 'text-gray-400'"
        @click="navigate(tab)"
      >
        <!-- Home icon -->
        <svg v-if="tab.name === 'home'" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
        </svg>

        <!-- Search icon -->
        <svg v-if="tab.name === 'search'" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8" />
          <path stroke-linecap="round" d="M21 21l-4.35-4.35" />
        </svg>

        <!-- Heart icon -->
        <svg v-if="tab.name === 'favorites'" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>

        <!-- Badge -->
        <span
          v-if="tab.name === 'favorites' && favCount > 0"
          class="absolute top-1 right-1/4 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1"
        >
          {{ favCount > 99 ? '99+' : favCount }}
        </span>

        <span class="text-[11px] mt-1 font-medium">{{ tab.label }}</span>
      </button>
    </div>
  </nav>
</template>
