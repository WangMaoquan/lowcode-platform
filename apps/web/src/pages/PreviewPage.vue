<script setup lang="ts">
import { ref, onMounted } from 'vue'

const previewContent = ref('')

onMounted(() => {
  // 从编辑器状态获取预览内容
})
</script>

<template>
  <div class="min-h-screen bg-white">
    <div class="border-b border-gray-200 px-4 py-3 flex justify-between items-center">
      <h1 class="text-lg font-medium">页面预览</h1>
      <button class="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">
        关闭预览
      </button>
    </div>
    <div class="p-4">
      <iframe 
        class="w-full h-[calc(100vh-100px)] border border-gray-300 rounded"
        :srcdoc="previewContent"
        sandbox="allow-scripts"
      />
    </div>
  </div>
</template>
