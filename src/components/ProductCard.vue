<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFavoritesStore } from '../stores/favorites'

interface Product {
  id: number
  name: string
  image_url: string | null
  product_url: string
  current_price: number
  original_price: number | null
  rating: number | null
  in_stock: boolean
  store: {
    name: string
  }
}

const props = defineProps<{
  product: Product
}>()

const router = useRouter()
const favoritesStore = useFavoritesStore()
const imageError = ref(false)

const isFavorite = computed(() => favoritesStore.isFavorite(props.product.id))

function formatPrice(price: number): string {
  return new Intl.NumberFormat('uz-UZ').format(price) + " so'm"
}

function openProduct() {
  router.push({ name: 'product', params: { id: props.product.id } })
}

function toggleFavorite(event: Event) {
  event.stopPropagation()
  favoritesStore.toggleFavorite(props.product)
}

function calculateDiscount(): number | null {
  if (props.product.original_price && props.product.original_price > props.product.current_price) {
    return Math.round((1 - props.product.current_price / props.product.original_price) * 100)
  }
  return null
}

function onImageError() {
  imageError.value = true
}
</script>

<template>
  <div class="card overflow-hidden cursor-pointer active:scale-[0.98] transition-transform" @click="openProduct">
    <!-- Image -->
    <div class="relative aspect-square bg-gray-100">
      <img
        v-if="product.image_url && !imageError"
        :src="product.image_url"
        :alt="product.name"
        class="w-full h-full object-contain"
        @error="onImageError"
        loading="lazy"
      />
      <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
        <span class="text-3xl font-bold text-primary-600 opacity-80">{{ product.store.name.charAt(0) }}</span>
      </div>

      <!-- Discount badge -->
      <span
        v-if="calculateDiscount()"
        class="absolute top-2 left-2 bg-red-500 text-white text-[11px] font-semibold px-2 py-0.5 rounded-lg"
      >
        -{{ calculateDiscount() }}%
      </span>

      <!-- Favorite button -->
      <button
        class="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center active:scale-110 transition-transform"
        @click="toggleFavorite"
      >
        <svg v-if="isFavorite" class="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <svg v-else class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>

    <!-- Info -->
    <div class="p-3">
      <p class="text-[11px] text-gray-400 mb-1">{{ product.store.name }}</p>
      <h3 class="text-sm font-medium text-gray-900 leading-tight mb-2 line-clamp-2">{{ product.name }}</h3>

      <div class="mb-1.5">
        <span class="text-base font-bold text-gray-900">{{ formatPrice(product.current_price) }}</span>
        <span v-if="product.original_price" class="ml-1.5 text-xs text-gray-400 line-through">
          {{ formatPrice(product.original_price) }}
        </span>
      </div>

      <div class="flex items-center gap-2 text-xs">
        <span v-if="product.rating" class="flex items-center gap-0.5 text-amber-500 font-medium">
          <svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {{ product.rating.toFixed(1) }}
        </span>
        <span
          class="font-medium"
          :class="product.in_stock ? 'text-emerald-500' : 'text-gray-400'"
        >
          {{ product.in_stock ? 'Mavjud' : 'Tugagan' }}
        </span>
      </div>
    </div>
  </div>
</template>
