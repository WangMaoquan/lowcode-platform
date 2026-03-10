<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import EditorCanvas from '@/editor/canvas/EditorCanvas.vue'
import ComponentTree from '@/editor/component-tree/ComponentTree.vue'
import PropertyPanel from '@/editor/property-panel/PropertyPanel.vue'
import EditorToolbar from '@/editor/toolbar/EditorToolbar.vue'

const route = useRoute()
const projectId = ref<string | undefined>(route.params.id as string)

onMounted(() => {
  // 加载项目数据
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
