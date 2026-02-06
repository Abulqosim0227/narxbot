<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../api/client'
import { useFavoritesStore } from '../stores/favorites'
import PriceChart from '../components/PriceChart.vue'
import PriceStats from '../components/PriceStats.vue'

interface Product {
  id: number
  name: string
  category: string | null
  brand: string | null
  image_url: string | null
  product_url: string
  current_price: number
  original_price: number | null
  rating: number | null
  review_count: number
  in_stock: boolean
  store: {
    id: number
    name: string
    slug: string
    logo_url: string | null
  }
}

const route = useRoute()
const router = useRouter()
const favoritesStore = useFavoritesStore()
const product = ref<Product | null>(null)
const loading = ref(true)
const error = ref(false)

const isFavorite = computed(() => product.value ? favoritesStore.isFavorite(product.value.id) : false)

const discount = computed(() => {
  if (product.value?.original_price && product.value.original_price > product.value.current_price) {
    return Math.round((1 - product.value.current_price / product.value.original_price) * 100)
  }
  return null
})

function formatPrice(price: number): string {
  return new Intl.NumberFormat('uz-UZ').format(price) + " so'm"
}

function openProduct() {
  if (product.value) {
    window.open(product.value.product_url, '_blank')
  }
}

function goBack() {
  router.back()
}

function toggleFavorite() {
  if (product.value) {
    favoritesStore.toggleFavorite(product.value)
  }
}

onMounted(async () => {
  try {
    const data = await api.get<Product>(`/products/${route.params.id}`)
    data.current_price = Number(data.current_price)
    data.original_price = data.original_price ? Number(data.original_price) : null
    product.value = data
  } catch (e) {
    error.value = true
    console.error('Failed to load product:', e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <!-- Sticky header -->
    <div class="sticky top-0 z-40 bg-gray-50/90 backdrop-blur-sm">
      <div class="flex items-center justify-between px-4 h-14">
        <button class="flex items-center gap-1 text-sm text-gray-600 font-medium" @click="goBack">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Orqaga
        </button>
        <button
          v-if="product"
          class="w-10 h-10 flex items-center justify-center rounded-full active:scale-110 transition-transform"
          @click="toggleFavorite"
        >
          <svg v-if="isFavorite" class="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <svg v-else class="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-16">
      <div class="spinner"></div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-16 px-4">
      <p class="text-gray-500 mb-4">Mahsulot topilmadi</p>
      <button class="btn-primary" @click="router.push({ name: 'home' })">Bosh sahifaga qaytish</button>
    </div>

    <!-- Product content -->
    <div v-else-if="product" class="px-4 pb-6">
      <!-- Image -->
      <div class="card overflow-hidden mb-4">
        <div class="aspect-square bg-gray-100">
          <img
            v-if="product.image_url"
            :src="product.image_url"
            :alt="product.name"
            class="w-full h-full object-contain"
          />
          <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
            Rasm mavjud emas
          </div>
        </div>
      </div>

      <!-- Info -->
      <div class="mb-4">
        <span class="inline-block bg-primary-50 text-primary-600 text-xs font-medium px-3 py-1 rounded-full mb-3">
          {{ product.store.name }}
        </span>

        <h1 class="text-xl font-semibold text-gray-900 leading-tight mb-4">{{ product.name }}</h1>

        <!-- Price -->
        <div class="flex items-baseline gap-3 mb-3">
          <span class="text-2xl font-bold text-gray-900">{{ formatPrice(product.current_price) }}</span>
          <span v-if="product.original_price" class="text-base text-gray-400 line-through">
            {{ formatPrice(product.original_price) }}
          </span>
          <span v-if="discount" class="text-sm font-semibold text-red-500">-{{ discount }}%</span>
        </div>

        <!-- Rating -->
        <div v-if="product.rating" class="flex items-center gap-1.5 text-sm mb-3">
          <svg class="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span class="font-medium text-amber-500">{{ product.rating.toFixed(1) }}</span>
          <span class="text-gray-400">({{ product.review_count }} ta sharh)</span>
        </div>

        <!-- Stock -->
        <span
          class="inline-block text-xs font-medium px-3 py-1.5 rounded-lg"
          :class="product.in_stock ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'"
        >
          {{ product.in_stock ? 'Mavjud' : 'Tugagan' }}
        </span>
      </div>

      <!-- Price Stats -->
      <div class="mb-4">
        <PriceStats :product-id="product.id" />
      </div>

      <!-- Price Chart -->
      <div class="mb-6">
        <PriceChart :product-id="product.id" />
      </div>

      <!-- Buy button -->
      <button
        class="w-full py-4 bg-primary-600 text-white text-base font-semibold rounded-xl active:bg-primary-700 transition-colors"
        @click="openProduct"
      >
        Sotib olish
      </button>
    </div>
  </div>
</template>
