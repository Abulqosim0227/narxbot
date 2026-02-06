<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '../api/client'

const props = defineProps<{
  productId: number
}>()

interface Stats {
  lowest_30d: number | null
  highest_30d: number | null
  average_30d: number | null
  lowest_ever: number | null
}

const loading = ref(true)
const stats = ref<Stats | null>(null)

function formatPrice(price: number | null): string {
  if (price === null) return '—'
  return new Intl.NumberFormat('uz-UZ').format(price) + " so'm"
}

onMounted(async () => {
  try {
    const data = await api.get<Stats>(`/products/${props.productId}/stats`, {
      params: { days: 30 },
    })
    stats.value = data
  } catch {
    // silently fail
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div v-if="loading" class="flex items-center justify-center py-8">
    <div class="spinner"></div>
  </div>

  <div v-else-if="stats" class="grid grid-cols-2 gap-3">
    <div class="card p-3 text-center">
      <p class="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-1">Eng past (30k)</p>
      <p class="text-sm font-bold text-emerald-500">{{ formatPrice(stats.lowest_30d) }}</p>
    </div>
    <div class="card p-3 text-center">
      <p class="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-1">Eng yuqori (30k)</p>
      <p class="text-sm font-bold text-red-500">{{ formatPrice(stats.highest_30d) }}</p>
    </div>
    <div class="card p-3 text-center">
      <p class="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-1">O'rtacha</p>
      <p class="text-sm font-bold text-gray-700">{{ formatPrice(stats.average_30d) }}</p>
    </div>
    <div class="card p-3 text-center">
      <p class="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-1">Eng past (umum)</p>
      <p class="text-sm font-bold text-primary-600">{{ formatPrice(stats.lowest_ever) }}</p>
    </div>
  </div>
</template>
