<script setup lang="ts">
import { computed } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { getComponentAsync, useMaterials } from '@lowcode/materials'
import { VueDraggable } from 'vue-draggable-plus'
import CanvasItem from './CanvasItem.vue'
import type { ComponentInstance } from '@lowcode/shared/types'

const props = defineProps<{
  component: ComponentInstance
  selected: boolean
}>()

const editorStore = useEditorStore()
const { getComponentDefinition } = useMaterials()

// 获取实际渲染的 Vue 组件
const RenderComponent = computed(() => {
  return getComponentAsync(props.component.name)
})

// 判断是否是容器组件
const isContainer = computed(() => {
  const def = getComponentDefinition(props.component.name)
  return def?.isContainer ?? false
})

// 子组件列表（容器专用）
const childrenComponents = computed({
  get: () => props.component.children || [],
  set: (value: ComponentInstance[]) => {
    editorStore.updateComponent(props.component.id, { children: value })
  },
})

const handleClick = (e: Event) => {
  e.stopPropagation()
  editorStore.selectComponent(props.component.id)
}

// 处理容器内的拖拽放置
const handleContainerDrop = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()

  try {
    const data = e.dataTransfer?.getData('application/json')
    if (!data) return

    const dragData = JSON.parse(data)
    const componentName = dragData.name

    const componentDef = getComponentDefinition(componentName)
    if (!componentDef) {
      console.warn(`未知的组件类型: ${componentName}`)
      return
    }

    // 创建组件实例
    const componentInstance: ComponentInstance = {
      id: generateUUID(),
      name: componentDef.name,
      label: componentDef.label,
      props: { ...componentDef.defaultProps },
      styles: {},
      events: {},
      children: [],
    }

    // 添加到容器的 children
    const newChildren = [...(props.component.children || []), componentInstance]
    editorStore.updateComponent(props.component.id, { children: newChildren })
  } catch (error) {
    console.error('处理容器内拖拽放置失败:', error)
  }
}

const handleContainerDragOver = (e: DragEvent) => {
  e.preventDefault()
  e.dataTransfer!.dropEffect = 'copy'
}

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
</script>

<template>
  <div
    class="relative cursor-pointer border-2 p-2 transition-all"
    :class="[
      selected ? 'border-indigo-500 bg-indigo-50' : 'border-transparent hover:border-gray-300',
      isContainer ? 'min-h-[80px]' : ''
    ]"
    @click="handleClick"
  >
    <!-- 拖拽手柄 -->
    <div
      class="drag-handle absolute left-0 top-0 cursor-move px-1 py-0.5 rounded bg-gray-100 hover:bg-gray-200 z-10"
      title="拖拽排序"
    >
      <svg class="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
        <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
      </svg>
    </div>

    <!-- 容器组件：显示子组件区域 -->
    <div
      v-if="isContainer"
      class="mt-2 rounded border-2 border-dashed border-gray-200 bg-gray-50 p-2 min-h-[60px]"
      @dragover="handleContainerDragOver"
      @drop="handleContainerDrop"
    >
      <!-- 子组件列表 -->
      <VueDraggable
        v-if="childrenComponents.length > 0"
        v-model="childrenComponents"
        :animation="150"
        handle=".drag-handle"
        ghost-class="opacity-50"
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
      <div v-else class="flex h-12 items-center justify-center text-sm text-gray-400">
        拖拽组件到此处
      </div>
    </div>

    <!-- 非容器组件：直接渲染 -->
    <template v-else>
      <component
        v-if="RenderComponent"
        :is="RenderComponent"
        v-bind="component.props"
      />
      <!-- 回退：显示组件名称 -->
      <div v-else class="text-sm text-gray-500">[{{ component.label }}]</div>
    </template>
  </div>
</template>
