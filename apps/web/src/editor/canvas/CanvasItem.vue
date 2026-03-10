<script setup lang="ts">
import { useEditorStore } from '@/stores/editor'
import type { ComponentInstance } from '@lowcode/shared/types'

const props = defineProps<{
  component: ComponentInstance
  selected: boolean
}>()

const editorStore = useEditorStore()

const handleClick = (e: Event) => {
  e.stopPropagation()
  editorStore.selectComponent(props.component.id)
}
</script>

<template>
  <div
    class="relative cursor-pointer border-2 p-2 transition-all"
    :class="
      selected ? 'border-indigo-500 bg-indigo-50' : 'border-transparent hover:border-gray-300'
    "
    @click="handleClick"
  >
    <div class="text-sm text-gray-500">[{{ component.label }}]</div>
  </div>
</template>
