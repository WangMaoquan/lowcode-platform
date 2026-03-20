<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  nickname: '',
  email: '',
})

const loading = ref(false)
const errorMessage = ref('')

const handleRegister = async () => {
  if (!formData.value.username || !formData.value.password) {
    errorMessage.value = '请输入用户名和密码'
    return
  }

  if (formData.value.password !== formData.value.confirmPassword) {
    errorMessage.value = '两次输入的密码不一致'
    return
  }

  loading.value = true
  errorMessage.value = ''
  try {
    await userStore.register({
      username: formData.value.username,
      password: formData.value.password,
      nickname: formData.value.nickname,
      email: formData.value.email,
    })
    router.push('/')
  } catch (error: any) {
    errorMessage.value = error.message || '注册失败'
    alert(errorMessage.value)
  } finally {
    loading.value = false
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-dark-bg text-dark-text font-sans flex items-center justify-center relative overflow-hidden">
    <!-- 背景效果 -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute inset-0 bg-grid-pattern"></div>
      <div class="absolute rounded-full blur-3xl w-[600px] h-[600px] bg-indigo-500/10 -top-50 -left-50"></div>
      <div class="absolute rounded-full blur-3xl w-[500px] h-[500px] bg-violet-500/10 -bottom-25 -right-25"></div>
    </div>

    <!-- 注册卡片 -->
    <div class="relative w-full max-w-md px-8 text-center">
      <!-- 头部 -->
      <div class="mb-8">
        <div class="flex items-center justify-center gap-3 mb-4">
          <div class="w-10 h-10 flex items-center justify-center rounded-xl bg-dark-accent">
            <span class="text-xl text-white">◈</span>
          </div>
          <span class="font-display text-xl font-semibold">LowCode</span>
        </div>
        <h1 class="font-display text-2xl font-bold mb-2">创建账户</h1>
        <p class="text-dark-text-secondary">填写信息开始使用 LowCode</p>
      </div>

      <!-- 注册表单 -->
      <div class="p-8 bg-dark-surface border border-dark-border rounded-2xl">
        <form @submit.prevent="handleRegister" class="space-y-5">
          <!-- 用户名 -->
          <div>
            <label for="username" class="block text-sm font-medium mb-2 text-left">用户名</label>
            <input
              id="username"
              v-model="formData.username"
              type="text"
              required
              class="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-dark-text placeholder-dark-text-secondary focus:outline-none focus:border-dark-accent focus:ring-1 focus:ring-dark-accent transition-colors duration-200"
              placeholder="请输入用户名"
            />
          </div>

          <!-- 昵称 -->
          <div>
            <label for="nickname" class="block text-sm font-medium mb-2 text-left">昵称</label>
            <input
              id="nickname"
              v-model="formData.nickname"
              type="text"
              class="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-dark-text placeholder-dark-text-secondary focus:outline-none focus:border-dark-accent focus:ring-1 focus:ring-dark-accent transition-colors duration-200"
              placeholder="请输入昵称（可选）"
            />
          </div>

          <!-- 邮箱 -->
          <div>
            <label for="email" class="block text-sm font-medium mb-2 text-left">邮箱</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              class="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-dark-text placeholder-dark-text-secondary focus:outline-none focus:border-dark-accent focus:ring-1 focus:ring-dark-accent transition-colors duration-200"
              placeholder="请输入邮箱（可选）"
            />
          </div>

          <!-- 密码 -->
          <div>
            <label for="password" class="block text-sm font-medium mb-2 text-left">密码</label>
            <input
              id="password"
              v-model="formData.password"
              type="password"
              required
              class="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-dark-text placeholder-dark-text-secondary focus:outline-none focus:border-dark-accent focus:ring-1 focus:ring-dark-accent transition-colors duration-200"
              placeholder="请输入密码"
            />
          </div>

          <!-- 确认密码 -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium mb-2 text-left">确认密码</label>
            <input
              id="confirmPassword"
              v-model="formData.confirmPassword"
              type="password"
              required
              class="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-dark-text placeholder-dark-text-secondary focus:outline-none focus:border-dark-accent focus:ring-1 focus:ring-dark-accent transition-colors duration-200"
              placeholder="请再次输入密码"
            />
          </div>

          <!-- 错误提示 -->
          <div v-if="errorMessage" class="text-red-400 text-sm text-center">
            {{ errorMessage }}
          </div>

          <!-- 注册按钮 -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 bg-dark-accent text-white rounded-lg font-medium hover:bg-dark-accent-hover hover:shadow-accent-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? '注册中...' : '注册' }}
          </button>

          <!-- 登录链接 -->
          <div class="text-center">
            <span class="text-dark-text-secondary text-sm">已有账户？</span>
            <button
              type="button"
              @click="goToLogin"
              class="ml-1 text-sm font-medium text-dark-accent hover:text-dark-accent-hover transition-colors duration-200"
            >
              立即登录
            </button>
          </div>
        </form>
      </div>

      <!-- 返回首页 -->
      <div class="text-center mt-8">
        <button
          @click="router.push('/')"
          class="text-dark-text-secondary text-sm hover:text-dark-text transition-colors duration-200"
        >
          ← 返回首页
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 网格背景 */
.bg-grid-pattern {
  background-image:
    linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}
</style>
