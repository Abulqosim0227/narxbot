<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import BottomNav from './components/BottomNav.vue'

const authStore = useAuthStore()

onMounted(async () => {
  const tg = window.Telegram?.WebApp
  if (tg) {
    tg.ready()
    tg.expand()
    tg.enableClosingConfirmation()

    if (tg.initData) {
      await authStore.authenticate(tg.initData)
    }
  }
})
</script>

<template>
  <div class="min-h-screen pb-20">
    <router-view />
    <BottomNav />
  </div>
</template>
