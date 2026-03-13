<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { useMaterials } from '@lowcode/materials'
import { VueDraggable } from 'vue-draggable-plus'
import CanvasItem from './CanvasItem.vue'
import type { ComponentInstance } from '@lowcode/shared/types'

const editorStore = useEditorStore()
const { getComponentDefinition } = useMaterials()

const components = computed(() => editorStore.page.components)
const selectedId = computed(() => editorStore.selectedId)

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

// 生成UUID
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// 处理组件放置
function handleDrop(e: DragEvent) {
  e.preventDefault()

  try {
    const data = e.dataTransfer?.getData('application/json')
    if (!data) return

    const dragData = JSON.parse(data)
    const componentName = dragData.name

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
      styles: {},
      events: {},
    }

    // 添加到编辑器
    editorStore.addComponent(componentInstance)
  } catch (error) {
    console.error('处理拖拽放置失败:', error)
  }
}

// 处理键盘事件
function handleKeyDown(e: KeyboardEvent) {
  // 确保不在输入元素中触发
  const target = e.target as HTMLElement
  if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
    return
  }

  // 检测Delete键
  if (e.key === 'Delete' || e.key === 'Backspace') {
    if (selectedId.value) {
      e.preventDefault()
      editorStore.removeComponent(selectedId.value)
    }
  }
}

// 添加键盘事件监听
onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

// 移除键盘事件监听
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div
    class="min-h-full rounded-lg border-2 border-dashed border-gray-300 bg-white p-4"
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
