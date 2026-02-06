<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js'
import { api } from '../api/client'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler)

const props = defineProps<{
  productId: number
}>()

interface HistoryEntry {
  date: string
  price: number
}

const loading = ref(true)
const error = ref(false)
const chartData = ref<any>(null)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      callbacks: {
        label: (ctx: any) => {
          return new Intl.NumberFormat('uz-UZ').format(ctx.raw) + " so'm"
        },
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        font: { size: 11 },
        color: '#9ca3af',
        maxTicksLimit: 6,
      },
    },
    y: {
      grid: { color: '#f3f4f6' },
      ticks: {
        font: { size: 11 },
        color: '#9ca3af',
        callback: (value: number) => {
          if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + 'M'
          if (value >= 1_000) return (value / 1_000).toFixed(0) + 'K'
          return value
        },
      },
    },
  },
  elements: {
    point: { radius: 2, hoverRadius: 5 },
    line: { tension: 0.3 },
  },
}

onMounted(async () => {
  try {
    const data = await api.get<{ history: HistoryEntry[] }>(`/products/${props.productId}/history`, {
      params: { days: 30 },
    })

    const entries = data.history || []
    if (entries.length === 0) {
      error.value = true
      return
    }

    chartData.value = {
      labels: entries.map((e) => {
        const d = new Date(e.date)
        return d.toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short' })
      }),
      datasets: [
        {
          label: 'Narx',
          data: entries.map((e) => e.price),
          borderColor: '#007ac7',
          backgroundColor: 'rgba(0, 122, 199, 0.08)',
          fill: true,
          borderWidth: 2,
        },
      ],
    }
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="card p-4">
    <h3 class="text-sm font-semibold text-gray-900 mb-3">Narx tarixi (30 kun)</h3>

    <div v-if="loading" class="flex items-center justify-center h-48">
      <div class="spinner"></div>
    </div>

    <div v-else-if="error" class="flex items-center justify-center h-48 text-gray-400 text-sm">
      Ma'lumot mavjud emas
    </div>

    <div v-else-if="chartData" class="h-48">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
