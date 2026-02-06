import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

interface Product {
  id: number
  name: string
  image_url: string | null
  product_url: string
  current_price: number
  original_price: number | null
  store: {
    name: string
  }
}

const STORAGE_KEY = 'narxbot_favorites'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<Product[]>([])

  // Load from localStorage on init
  function loadFavorites() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        favorites.value = JSON.parse(saved)
      }
    } catch (e) {
      console.error('Failed to load favorites:', e)
    }
  }

  // Save to localStorage
  function saveFavorites() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites.value))
    } catch (e) {
      console.error('Failed to save favorites:', e)
    }
  }

  function addFavorite(product: Product) {
    if (!isFavorite(product.id)) {
      favorites.value.push(product)
      saveFavorites()
    }
  }

  function removeFavorite(productId: number) {
    favorites.value = favorites.value.filter(p => p.id !== productId)
    saveFavorites()
  }

  function toggleFavorite(product: Product) {
    if (isFavorite(product.id)) {
      removeFavorite(product.id)
    } else {
      addFavorite(product)
    }
  }

  function isFavorite(productId: number): boolean {
    return favorites.value.some(p => p.id === productId)
  }

  // Load on init
  loadFavorites()

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  }
})
