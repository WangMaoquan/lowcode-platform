<script setup lang="ts">
import type { ComponentInstance } from '@lowcode/shared/types'

defineProps<{
  component: ComponentInstance
}>()
</script>

<template>
  <div>
    <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">样式属性</h4>
    <div class="space-y-3">
      <div>
        <label class="block text-xs text-gray-600 mb-1">宽度</label>
        <input 
          type="text" 
          :value="component.styles?.width || ''" 
          placeholder="如: 100px 或 50%"
          class="w-full px-2 py-1 text-sm border border-gray-300 rounded"
        />
      </div>
      <div>
        <label class="block text-xs text-gray-600 mb-1">高度</label>
        <input 
          type="text" 
          :value="component.styles?.height || ''" 
          placeholder="如: 100px 或 auto"
          class="w-full px-2 py-1 text-sm border border-gray-300 rounded"
        />
      </div>
      <div>
        <label class="block text-xs text-gray-600 mb-1">背景颜色</label>
        <input 
          type="text" 
          :value="component.styles?.backgroundColor || ''" 
          placeholder="如: #ffffff"
          class="w-full px-2 py-1 text-sm border border-gray-300 rounded"
        />
      </div>
      <div>
        <label class="block text-xs text-gray-600 mb-1">外边距</label>
        <input 
          type="text" 
          :value="component.styles?.margin || ''" 
          placeholder="如: 10px 或 10px 20px"
          class="w-full px-2 py-1 text-sm border border-gray-300 rounded"
        />
      </div>
      <div>
        <label class="block text-xs text-gray-600 mb-1">内边距</label>
        <input 
          type="text" 
          :value="component.styles?.padding || ''" 
          placeholder="如: 10px 或 10px 20px"
          class="w-full px-2 py-1 text-sm border border-gray-300 rounded"
        />
      </div>
    </div>
  </div>
</template>
