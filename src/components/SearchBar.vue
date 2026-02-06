<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = defineProps<{
  initialValue?: string
}>()

const emit = defineEmits<{
  (e: 'search', query: string): void
}>()

const query = ref('')

function handleSubmit() {
  const trimmed = query.value.trim()
  if (trimmed) {
    emit('search', trimmed)
  }
}

onMounted(() => {
  if (props.initialValue) {
    query.value = props.initialValue
  }
})

watch(() => props.initialValue, (newVal) => {
  if (newVal !== undefined) {
    query.value = newVal
  }
})
</script>

<template>
  <form class="flex gap-2 mb-5" @submit.prevent="handleSubmit">
    <input
      v-model="query"
      type="text"
      placeholder="Mahsulot qidirish..."
      class="flex-1 py-3.5 px-4 bg-white border border-gray-200 rounded-xl text-gray-900 text-base outline-none transition-colors focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20 placeholder:text-gray-400"
    />
    <button
      type="submit"
      class="w-[50px] h-[50px] bg-primary-600 rounded-xl flex items-center justify-center text-white transition-colors active:bg-primary-700"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
      </svg>
    </button>
  </form>
</template>
