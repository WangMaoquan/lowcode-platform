<script setup lang="ts">
import { ref } from 'vue'
import { useEditorStore } from '@/stores/editor'
import BasicProperties from './BasicProperties.vue'
import StyleProperties from './StyleProperties.vue'
import EventProperties from './EventProperties.vue'

const editorStore = useEditorStore()

// Tab 切换状态
const activeTab = ref<'basic' | 'style' | 'event'>('basic')

// Tab 配置
const tabs = [
  { key: 'basic', label: '基础', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', gradient: 'var(--color-dark-accent)' },
  { key: 'style', label: '样式', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01', gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6)' },
  { key: 'event', label: '事件', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9', gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)' },
] as const
</script>

<template>
  <div class="p-3 h-full flex flex-col">
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

    <!-- 未选中组件提示 -->
    <div v-if="!editorStore.selectedComponent" class="flex-1 flex flex-col items-center justify-center py-12 px-4">
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

    <!-- Tab 内容区域 -->
    <template v-else>
      <!-- Tab 切换 -->
      <div class="flex border-b mb-3" style="border-color: var(--color-dark-border);">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          class="flex-1 flex flex-col items-center gap-1 py-2 px-1 transition-colors relative"
          :style="{
            color: activeTab === tab.key ? 'var(--color-dark-text)' : 'var(--color-dark-text-secondary)'
          }"
        >
          <!-- 激活指示器 -->
          <div
            v-if="activeTab === tab.key"
            class="absolute bottom-0 left-0 right-0 h-0.5"
            :style="{ background: tab.gradient }"
          ></div>

          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="tab.icon" />
          </svg>
          <span class="text-xs">{{ tab.label }}</span>
        </button>
      </div>

      <!-- Tab 内容 -->
      <div class="flex-1 overflow-y-auto">
        <BasicProperties v-if="activeTab === 'basic'" :component="editorStore.selectedComponent" />
        <StyleProperties v-else-if="activeTab === 'style'" :component="editorStore.selectedComponent" />
        <EventProperties v-else-if="activeTab === 'event'" :component="editorStore.selectedComponent" />
      </div>
    </template>
  </div>
</template>
