<script setup lang="ts">
import { computed } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { useMaterials } from '@lowcode/materials'
import { generateUUID } from '@lowcode/shared'
import { VueDraggable } from 'vue-draggable-plus'
import CanvasItem from './CanvasItem.vue'
import type { ComponentInstance } from '@lowcode/shared/types'

const editorStore = useEditorStore()
const { getComponentDefinition } = useMaterials()

const components = computed(() => editorStore.page.components)
const selectedId = computed(() => editorStore.selectedId)

// 点击画布空白处取消选中
const handleCanvasClick = () => {
  editorStore.selectComponent('')
}

// 双向绑定组件列表
const componentList = computed({
  get: () => editorStore.page.components,
  set: (value: ComponentInstance[]) => {
    editorStore.reorderComponents(value)
  },
})

// 处理拖拽悬停
function handleDragOver(e: DragEvent) {
  e.preventDefault()
  e.dataTransfer!.dropEffect = 'copy'
}

// 处理组件放置
function handleDrop(e: DragEvent) {
  e.preventDefault()

  try {
    const data = e.dataTransfer?.getData('application/json')
    // 如果没有数据（VueDraggable 内部排序），直接返回
    if (!data || typeof data !== 'string') return

    const dragData = JSON.parse(data)

    // 验证数据结构
    if (!dragData || !dragData.type || dragData.type !== 'new') return

    const componentName = dragData.name
    if (!componentName) return

    // 从物料库获取组件定义
    const componentDef = getComponentDefinition(componentName)
    if (!componentDef) {
      console.warn(`未知的组件类型: ${componentName}`)
      return
    }

    // 根据组件定义创建组件实例
    const componentInstance: ComponentInstance = {
      id: generateUUID(),
      name: componentDef.name,
      label: componentDef.label,
      props: { ...componentDef.defaultProps },
      styles: { ...componentDef.defaultStyles },
      events: {},
    }

    // 添加到编辑器
    editorStore.addComponent(componentInstance)
  } catch (error) {
    console.error('处理拖拽放置失败:', error)
  }
}
</script>

<template>
  <div
    class="min-h-full rounded-lg border-2 border-dashed border-gray-300 bg-white p-4"
    @click="handleCanvasClick"
    @dragover="handleDragOver"
    @drop="handleDrop"
  >
    <div v-if="components.length === 0" class="flex h-64 items-center justify-center text-gray-400">
      <div class="text-center">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        <p class="mt-2 text-sm">从左侧拖拽组件到此处</p>
      </div>
    </div>

    <VueDraggable
      v-else
      v-model="componentList"
      :animation="150"
      handle=".drag-handle"
      ghost-class="opacity-50"
      group="components"
      class="space-y-2"
    >
      <CanvasItem
        v-for="component in componentList"
        :key="component.id"
        :component="component"
        :selected="selectedId === component.id"
      />
    </VueDraggable>
  </div>
</template>
