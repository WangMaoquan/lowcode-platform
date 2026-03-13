<script setup lang="ts">
import { computed, ref } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { getComponentAsync, useMaterials } from '@lowcode/materials'
import { generateUUID } from '@lowcode/shared'
import ContextMenu from '../context-menu/ContextMenu.vue'
import type { MenuItem } from '../context-menu/ContextMenu.vue'
import ContainerChildren from './ContainerChildren.vue'
import type { ComponentInstance } from '@lowcode/shared/types'

const props = defineProps<{
  component: ComponentInstance
  selected: boolean
}>()

const editorStore = useEditorStore()
const { getComponentDefinition } = useMaterials()

// 右键菜单状态
const showContextMenu = ref(false)
const contextMenuX = ref(0)
const contextMenuY = ref(0)

// 容器拖拽状态
const isDragOver = ref(false)

// 获取实际渲染的 Vue 组件
const RenderComponent = computed(() => {
  return getComponentAsync(props.component.name)
})

// 判断是否是容器组件
const isContainer = computed(() => {
  const def = getComponentDefinition(props.component.name)
  return def?.isContainer ?? false
})

// 组件样式
const componentStyle = computed(() => {
  const styles = props.component.styles || {}
  const styleObj: Record<string, string> = {}

  // 转换样式键为 kebab-case
  for (const [key, value] of Object.entries(styles)) {
    if (value !== '' && value !== undefined && value !== null) {
      // 转换 camelCase 为 kebab-case
      const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      styleObj[kebabKey] = value
    }
  }

  return styleObj
})

const handleClick = (e: Event) => {
  e.stopPropagation()
  editorStore.selectComponent(props.component.id)
}

// 处理画布组件拖拽开始
const handleComponentDragStart = (e: DragEvent) => {
  e.dataTransfer?.setData('application/json', JSON.stringify({
    type: 'move', // 移动现有组件
    id: props.component.id,
  }))
}

// 处理容器内的拖拽放置
const handleContainerDrop = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()

  try {
    const data = e.dataTransfer?.getData('application/json')
    // 如果没有数据（VueDraggable 内部排序），直接返回
    if (!data || typeof data !== 'string') return

    const dragData = JSON.parse(data)

    // 验证数据结构
    if (!dragData || !dragData.type) return

    // 只处理从组件树拖入的新建组件
    // VueDraggable 内部排序不需要额外处理
    if (dragData.type === 'new') {
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
        styles: { ...componentDef.defaultStyles },
        events: {},
        children: [],
      }

      // 添加到容器的 children
      const newChildren = [...(props.component.children || []), componentInstance]
      editorStore.updateComponent(props.component.id, { children: newChildren })
    }
  } catch (error) {
    console.error('处理容器内拖拽放置失败:', error)
  }
}

const handleContainerDragOver = (e: DragEvent) => {
  e.preventDefault()
  e.dataTransfer!.dropEffect = 'copy'
  isDragOver.value = true
}

const handleContainerDragEnter = (e: DragEvent) => {
  e.preventDefault()
  isDragOver.value = true
}

const handleContainerDragLeave = (e: DragEvent) => {
  e.preventDefault()
  isDragOver.value = false
}

// 右键菜单
const handleContextMenu = (e: MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()
  editorStore.selectComponent(props.component.id)
  contextMenuX.value = e.clientX
  contextMenuY.value = e.clientY
  showContextMenu.value = true
}

const closeContextMenu = () => {
  showContextMenu.value = false
}

// 菜单项
const menuItems = computed<MenuItem[]>(() => [
  {
    label: '复制',
    action: () => editorStore.copyComponent(),
  },
  {
    label: '粘贴',
    action: () => editorStore.pasteComponent(props.component.id),
    disabled: !editorStore.clipboard || !isContainer.value,
  },
  {
    label: '剪切',
    action: () => editorStore.cutComponent(),
  },
  {
    label: '删除',
    danger: true,
    action: () => editorStore.removeComponent(props.component.id),
  },
])
</script>

<template>
  <div
    class="relative cursor-pointer border-2 p-2 transition-all"
    :class="[
      selected ? 'border-indigo-500 bg-indigo-50' : 'border-transparent hover:border-gray-300',
      isContainer ? 'min-h-[80px]' : ''
    ]"
    :style="componentStyle"
    draggable="true"
    @click="handleClick"
    @dragstart="handleComponentDragStart"
    @contextmenu="handleContextMenu"
  >
    <!-- 右键菜单 -->
    <ContextMenu
      v-if="showContextMenu"
      :x="contextMenuX"
      :y="contextMenuY"
      :items="menuItems"
      @close="closeContextMenu"
    />
    <!-- 拖拽手柄：只在选中时显示 -->
    <div
      class="drag-handle absolute left-0 top-0 cursor-move px-1 py-0.5 rounded bg-gray-100 hover:bg-gray-200 z-10 transition-opacity"
      :class="selected ? 'opacity-100' : 'opacity-0 pointer-events-none'"
      title="拖拽排序"
    >
      <svg class="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
        <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
      </svg>
    </div>

    <!-- 容器组件：显示子组件区域 -->
    <div
      v-if="isContainer"
      class="mt-2 rounded border-2 border-dashed p-4 min-h-[100px] transition-all"
      :class="[
        isDragOver ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 bg-gray-50'
      ]"
      @dragover="handleContainerDragOver"
      @dragenter="handleContainerDragEnter"
      @dragleave="handleContainerDragLeave"
      @drop="handleContainerDrop"
    >
      <ContainerChildren :component="component" />
    </div>

    <!-- 非容器组件：直接渲染 -->
    <template v-else>
      <component
        v-if="RenderComponent"
        :is="RenderComponent"
        v-bind="component.props"
        :style="componentStyle"
      />
      <!-- 回退：显示组件名称 -->
      <div v-else class="text-sm text-gray-500">[{{ component.label }}]</div>
    </template>
  </div>
</template>
