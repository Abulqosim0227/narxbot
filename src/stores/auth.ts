import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../api/client'

interface User {
  id: number
  telegram_id: number
  username: string | null
  first_name: string
  last_name: string | null
  language_code: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isAuthenticated = ref(false)

  async function authenticate(initData: string) {
    try {
      const response = await api.post('/auth/telegram', { init_data: initData })
      token.value = response.data.access_token
      user.value = response.data.user
      isAuthenticated.value = true
      sessionStorage.setItem('token', response.data.access_token)
    } catch {
      isAuthenticated.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = null
    isAuthenticated.value = false
    sessionStorage.removeItem('token')
  }

  return {
    user,
    token,
    isAuthenticated,
    authenticate,
    logout,
  }
})
