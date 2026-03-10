<script setup lang="ts">
import type { ComponentInstance } from '@lowcode/shared/types'

defineProps<{
  component: ComponentInstance
}>()
</script>

<template>
  <div>
    <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">基础属性</h4>
    <div class="space-y-3">
      <div>
        <label class="block text-xs text-gray-600 mb-1">组件ID</label>
        <input 
          type="text" 
          :value="component.id" 
          disabled
          class="w-full px-2 py-1 text-sm border border-gray-300 rounded bg-gray-50"
        />
      </div>
      <div>
        <label class="block text-xs text-gray-600 mb-1">组件名称</label>
        <input 
          type="text" 
          :value="component.label" 
          disabled
          class="w-full px-2 py-1 text-sm border border-gray-300 rounded bg-gray-50"
        />
      </div>
    </div>
  </div>
</template>
