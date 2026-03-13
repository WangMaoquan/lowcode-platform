<script setup lang="ts">
import type { ComponentDefinition } from '@lowcode/shared/types'

defineProps<{
  definition: ComponentDefinition
}>()

const handleDragStart = (e: DragEvent, def: ComponentDefinition) => {
  e.dataTransfer?.setData('application/json', JSON.stringify({
    type: 'new', // 新建组件
    name: def.name,
  }))
}
</script>

<template>
  <div
    class="px-3 py-2.5 rounded-lg cursor-move transition-all duration-200 group relative overflow-hidden"
    style="
      background-color: var(--color-dark-surface);
      border: 1px solid var(--color-dark-border);
      color: var(--color-dark-text);
    "
    draggable="true"
    @dragstart="handleDragStart($event, definition)"
  >
    <!-- 悬停时的发光效果 -->
    <div
      class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      style="background: linear-gradient(135deg, var(--color-dark-accent-glow), transparent);"
    />

    <!-- 悬停时的边框发光 -->
    <div
      class="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
      style="box-shadow: inset 0 0 0 1px var(--color-dark-accent);"
    />

    <span class="text-sm relative z-10 flex items-center gap-2">
      <!-- 组件图标 -->
      <span
        class="w-5 h-5 rounded flex items-center justify-center text-[10px]"
        style="background-color: var(--color-dark-border); color: var(--color-dark-text-secondary);"
      >
        <svg v-if="definition.category === 'basic'" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
        <svg v-else-if="definition.category === 'layout'" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
        <svg v-else-if="definition.category === 'form'" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        <svg v-else-if="definition.category === 'display'" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <svg v-else class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </span>
      {{ definition.label }}
    </span>
  </div>
</template>
