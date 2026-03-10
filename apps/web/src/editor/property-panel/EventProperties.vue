<script setup lang="ts">
import type { ComponentInstance } from '@lowcode/shared/types'

defineProps<{
  component: ComponentInstance
}>()
</script>

<template>
  <div>
    <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">事件属性</h4>
    <div class="space-y-3">
      <div>
        <label class="block text-xs text-gray-600 mb-1">点击事件</label>
        <input 
          type="text" 
          :value="component.events?.click || ''" 
          placeholder="输入处理函数名称"
          class="w-full px-2 py-1 text-sm border border-gray-300 rounded"
        />
      </div>
      <div>
        <label class="block text-xs text-gray-600 mb-1">变更事件</label>
        <input 
          type="text" 
          :value="component.events?.change || ''" 
          placeholder="输入处理函数名称"
          class="w-full px-2 py-1 text-sm border border-gray-300 rounded"
        />
      </div>
    </div>
  </div>
</template>
