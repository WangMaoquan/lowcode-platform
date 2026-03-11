import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

interface User {
  id: string
  username: string
  nickname?: string
  email?: string
  avatar?: string
}

interface LoginForm {
  username: string
  password: string
}

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const user = ref<User | null>(null)
  const token = ref<string>('')
  const loading = ref(false)

  const login = async (form: LoginForm) => {
    loading.value = true
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || '登录失败')
      }

      const data = await response.json()
      token.value = data.access_token
      user.value = data.user

      localStorage.setItem('token', data.access_token)
      localStorage.setItem('user', JSON.stringify(data.user))

      return data
    } catch (error: any) {
      throw new Error(error.message || '登录失败')
    } finally {
      loading.value = false
    }
  }

  const register = async (form: LoginForm & { nickname?: string; email?: string }) => {
    loading.value = true
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || '注册失败')
      }

      const data = await response.json()
      token.value = data.access_token
      user.value = data.user

      localStorage.setItem('token', data.access_token)
      localStorage.setItem('user', JSON.stringify(data.user))

      return data
    } catch (error: any) {
      throw new Error(error.message || '注册失败')
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = ''
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  const initUser = () => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')

    if (savedToken && savedUser) {
      token.value = savedToken
      user.value = JSON.parse(savedUser)
    }
  }

  return {
    user,
    token,
    loading,
    login,
    register,
    logout,
    initUser,
  }
})
