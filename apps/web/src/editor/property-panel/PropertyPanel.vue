<script setup lang="ts">
import { computed } from 'vue'
import { useEditorStore } from '@/stores/editor'
import BasicProperties from './BasicProperties.vue'
import StyleProperties from './StyleProperties.vue'
import EventProperties from './EventProperties.vue'

const editorStore = useEditorStore()

const selectedComponent = computed(() => {
  if (!editorStore.selectedId) return null
  return editorStore.page.components.find(c => c.id === editorStore.selectedId)
})
</script>

<template>
  <div class="p-4">
    <h3 class="text-sm font-medium text-gray-900 mb-4">属性配置</h3>
    
    <div v-if="!selectedComponent" class="text-center text-gray-400 py-8">
      <p class="text-sm">请选择一个组件</p>
    </div>
    
    <div v-else class="space-y-6">
      <!-- 基础属性 -->
      <BasicProperties :component="selectedComponent" />
      
      <!-- 样式属性 -->
      <StyleProperties :component="selectedComponent" />
      
      <!-- 事件属性 -->
      <EventProperties :component="selectedComponent" />
    </div>
  </div>
</template>
