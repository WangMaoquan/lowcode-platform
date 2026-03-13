<script setup lang="ts">
import { computed } from 'vue'
import { useEditorStore } from '@/stores/editor'
import BasicProperties from './BasicProperties.vue'
import StyleProperties from './StyleProperties.vue'
import EventProperties from './EventProperties.vue'

const editorStore = useEditorStore()

// 使用 store 中已支持递归查找的 selectedComponent
const selectedComponent = computed(() => editorStore.selectedComponent)
</script>

<template>
  <div class="p-3">
    <!-- 标题 -->
    <div class="flex items-center gap-2 mb-4 px-2">
      <div
        class="w-6 h-6 rounded-md flex items-center justify-center"
        style="background: linear-gradient(135deg, var(--color-dark-accent), #8b5cf6);"
      >
        <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <h3 class="text-sm font-semibold" style="color: var(--color-dark-text); font-family: var(--font-display);">属性配置</h3>
    </div>

    <div v-if="!selectedComponent" class="flex flex-col items-center justify-center py-12 px-4">
      <div
        class="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
        style="background-color: var(--color-dark-surface-hover);"
      >
        <svg class="w-8 h-8" style="color: var(--color-dark-text-secondary);" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      </div>
      <p class="text-sm" style="color: var(--color-dark-text-secondary);">请选择一个组件</p>
      <p class="text-xs mt-1" style="color: var(--color-dark-text-secondary); opacity: 0.7;">点击画布中的组件进行编辑</p>
    </div>

    <div v-else class="space-y-3">
      <!-- 基础属性 -->
      <BasicProperties :component="selectedComponent" />

      <!-- 样式属性 -->
      <StyleProperties :component="selectedComponent" />

      <!-- 事件属性 -->
      <EventProperties :component="selectedComponent" />
    </div>
  </div>
</template>
