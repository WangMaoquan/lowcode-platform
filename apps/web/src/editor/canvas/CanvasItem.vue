<script setup lang="ts">
import { computed } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { getComponentAsync } from '@lowcode/materials'
import type { ComponentInstance } from '@lowcode/shared/types'

const props = defineProps<{
  component: ComponentInstance
  selected: boolean
}>()

const editorStore = useEditorStore()

// 获取实际渲染的 Vue 组件
const RenderComponent = computed(() => {
  return getComponentAsync(props.component.name)
})

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
    <!-- 动态渲染组件 -->
    <component
      v-if="RenderComponent"
      :is="RenderComponent"
      v-bind="component.props"
    />
    <!-- 回退：显示组件名称 -->
    <div v-else class="text-sm text-gray-500">[{{ component.label }}]</div>
  </div>
</template>
