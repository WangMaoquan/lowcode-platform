<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useEditorStore } from '@/stores/editor'
import EditorCanvas from '@/editor/canvas/EditorCanvas.vue'
import ComponentTree from '@/editor/component-tree/ComponentTree.vue'
import PropertyPanel from '@/editor/property-panel/PropertyPanel.vue'
import EditorToolbar from '@/editor/toolbar/EditorToolbar.vue'

const route = useRoute()
const editorStore = useEditorStore()
const projectId = ref<string | undefined>(route.params.id as string)

// 键盘快捷键处理
const handleKeydown = (e: KeyboardEvent) => {
  // 检查是否在输入框中
  const target = e.target as HTMLElement
  if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
    return
  }

  // Ctrl + C: 复制
  if (e.ctrlKey && e.key === 'c') {
    e.preventDefault()
    editorStore.copyComponent()
  }
  // Ctrl + V: 粘贴
  else if (e.ctrlKey && e.key === 'v') {
    e.preventDefault()
    editorStore.pasteComponent()
  }
  // Ctrl + X: 剪切
  else if (e.ctrlKey && e.key === 'x') {
    e.preventDefault()
    editorStore.cutComponent()
  }
  // Delete/Backspace: 删除选中组件
  else if (e.key === 'Delete' || e.key === 'Backspace') {
    if (editorStore.selectedId) {
      e.preventDefault()
      editorStore.removeComponent(editorStore.selectedId)
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="h-screen flex flex-col bg-gray-100">
    <!-- 工具栏 -->
    <EditorToolbar :project-id="projectId" />
    
    <!-- 主编辑区域 -->
    <div class="flex-1 flex overflow-hidden">
      <!-- 左侧组件树面板 -->
      <div class="w-64 bg-white border-r border-gray-200 overflow-y-auto">
        <ComponentTree />
      </div>
      
      <!-- 中间画布区域 -->
      <div class="flex-1 overflow-auto p-4">
        <EditorCanvas />
      </div>
      
      <!-- 右侧属性面板 -->
      <div class="w-80 bg-white border-l border-gray-200 overflow-y-auto">
        <PropertyPanel />
      </div>
    </div>
  </div>
</template>
