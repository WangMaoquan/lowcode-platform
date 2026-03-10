<script setup lang="ts">
import type { ComponentDefinition } from '@lowcode/shared/types'

defineProps<{
  definition: ComponentDefinition
}>()

const handleDragStart = (e: DragEvent, def: ComponentDefinition) => {
  e.dataTransfer?.setData('application/json', JSON.stringify({
    type: 'component',
    name: def.name,
  }))
}
</script>

<template>
  <div 
    class="px-3 py-2 bg-white border border-gray-200 rounded cursor-move hover:bg-gray-50 hover:border-indigo-300 transition-colors"
    draggable="true"
    @dragstart="handleDragStart($event, definition)"
  >
    <span class="text-sm text-gray-700">{{ definition.label }}</span>
  </div>
</template>
