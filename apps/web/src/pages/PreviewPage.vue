<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const previewContent = ref('')

onMounted(() => {
  // 从编辑器状态获取预览内容
})

const handleClose = () => {
  router.back()
}
</script>

<template>
  <div class="min-h-screen bg-dark-bg text-dark-text font-sans flex flex-col">
    <!-- 顶部工具栏 -->
    <header class="h-14 flex-shrink-0 bg-dark-surface border-b border-dark-border flex items-center justify-between px-4">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 flex items-center justify-center rounded-lg bg-dark-accent">
          <span class="text-white text-sm">◈</span>
        </div>
        <span class="font-display font-semibold">LowCode</span>
        <div class="h-6 w-px bg-dark-border mx-2"></div>
        <h1 class="text-sm text-dark-text-secondary">页面预览</h1>
      </div>
      <div class="flex items-center gap-3">
        <button
          @click="handleClose"
          class="px-4 py-2 text-sm font-medium bg-dark-surface border border-dark-border rounded-lg hover:bg-dark-surface-hover hover:border-dark-accent transition-all duration-200"
        >
          关闭预览
        </button>
      </div>
    </header>

    <!-- 预览区域 -->
    <main class="flex-1 p-4 overflow-hidden">
      <div class="h-full bg-dark-surface border border-dark-border rounded-xl overflow-hidden">
        <iframe
          class="w-full h-full"
          :srcdoc="previewContent"
          sandbox="allow-scripts"
        />
      </div>
    </main>
  </div>
</template>
