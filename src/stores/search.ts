import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../api/client'

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

interface SearchResult {
  products: Product[]
  total: number
  page: number
  per_page: number
  cheapest: Product | null
}

export const useSearchStore = defineStore('search', () => {
  const results = ref<SearchResult | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const query = ref('')

  async function search(params: { q: string }) {
    loading.value = true
    error.value = null
    query.value = params.q

    try {
      const data = await api.get<SearchResult>('/search', { params: { q: params.q } })
      // API returns prices as strings — convert to numbers
      if (data.products) {
        data.products = data.products.map(p => ({
          ...p,
          current_price: Number(p.current_price),
          original_price: p.original_price ? Number(p.original_price) : null,
        }))
      }
      if (data.cheapest) {
        data.cheapest = {
          ...data.cheapest,
          current_price: Number(data.cheapest.current_price),
          original_price: data.cheapest.original_price ? Number(data.cheapest.original_price) : null,
        }
      }
      results.value = data
    } catch (e) {
      error.value = 'Qidirishda xatolik yuz berdi'
      console.error('Search error:', e)
    } finally {
      loading.value = false
    }
  }

  function clearResults() {
    results.value = null
    query.value = ''
    error.value = null
  }

  return {
    results,
    loading,
    error,
    query,
    search,
    clearResults,
  }
})
