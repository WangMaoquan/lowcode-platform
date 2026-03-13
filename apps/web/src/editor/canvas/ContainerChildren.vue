<script setup lang="ts">
import { computed } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { VueDraggable } from 'vue-draggable-plus'
import CanvasItem from './CanvasItem.vue'
import type { ComponentInstance } from '@lowcode/shared/types'

const props = defineProps<{
  component: ComponentInstance
}>()

const editorStore = useEditorStore()

// 子组件列表（容器专用）
const childrenComponents = computed({
  get: () => props.component.children || [],
  set: (value: ComponentInstance[]) => {
    editorStore.updateComponent(props.component.id, { children: value })
  },
})
</script>

<template>
  <VueDraggable
    v-model="childrenComponents"
    :animation="150"
    handle=".drag-handle"
    ghost-class="opacity-50"
    group="components"
    class="space-y-2"
  >
    <CanvasItem
      v-for="child in childrenComponents"
      :key="child.id"
      :component="child"
      :selected="editorStore.selectedId === child.id"
    />
  </VueDraggable>
  <!-- 空容器提示 -->
  <div v-if="childrenComponents.length === 0" class="flex h-12 items-center justify-center text-sm text-gray-400">
    拖拽组件到此处
  </div>
</template>
