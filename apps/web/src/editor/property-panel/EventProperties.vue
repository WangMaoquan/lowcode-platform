<script setup lang="ts">
import type { ComponentInstance } from '@lowcode/shared/types'

defineProps<{
  component: ComponentInstance
}>()
</script>

<template>
  <div class="rounded-lg overflow-hidden" style="background-color: var(--color-dark-surface-hover);">
    <!-- 区块标题 -->
    <div class="px-3 py-2.5 flex items-center gap-2" style="border-bottom: 1px solid var(--color-dark-border);">
      <div
        class="w-5 h-5 rounded flex items-center justify-center"
        style="background: linear-gradient(135deg, #f59e0b, #ef4444);"
      >
        <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </div>
      <h4 class="text-xs font-semibold" style="color: var(--color-dark-text); font-family: var(--font-display);">事件属性</h4>
    </div>

    <div class="p-3 space-y-3">
      <div>
        <label class="block text-xs mb-1.5" style="color: var(--color-dark-text-secondary);">点击事件</label>
        <input
          type="text"
          :value="component.events?.click || ''"
          placeholder="输入处理函数名称"
          class="w-full px-2.5 py-2 text-xs rounded-lg border transition-all"
          style="
            background-color: var(--color-dark-surface);
            border-color: var(--color-dark-border);
            color: var(--color-dark-text);
          "
        />
      </div>
      <div>
        <label class="block text-xs mb-1.5" style="color: var(--color-dark-text-secondary);">变更事件</label>
        <input
          type="text"
          :value="component.events?.change || ''"
          placeholder="输入处理函数名称"
          class="w-full px-2.5 py-2 text-xs rounded-lg border transition-all"
          style="
            background-color: var(--color-dark-surface);
            border-color: var(--color-dark-border);
            color: var(--color-dark-text);
          "
        />
      </div>
    </div>
  </div>
</template>
