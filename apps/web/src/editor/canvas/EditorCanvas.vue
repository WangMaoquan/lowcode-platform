<script setup lang="ts">
import { computed } from 'vue'
import { useEditorStore } from '@/stores/editor'
import CanvasItem from './CanvasItem.vue'

const editorStore = useEditorStore()

const components = computed(() => editorStore.page.components)
const selectedId = computed(() => editorStore.selectedId)
</script>

<template>
  <div class="min-h-full bg-white border-2 border-dashed border-gray-300 rounded-lg p-4">
    <div v-if="components.length === 0" class="flex items-center justify-center h-64 text-gray-400">
      <div class="text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <p class="mt-2 text-sm">从左侧拖拽组件到此处</p>
      </div>
    </div>
    
    <div v-else class="space-y-2">
      <CanvasItem 
        v-for="component in components" 
        :key="component.id"
        :component="component"
        :selected="selectedId === component.id"
      />
    </div>
  </div>
</template>
