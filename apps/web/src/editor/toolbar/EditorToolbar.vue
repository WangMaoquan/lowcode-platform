<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useEditorStore } from '@/stores/editor'
import ToolbarButton from './ToolbarButton.vue'

defineProps<{
  projectId?: string
}>()

const router = useRouter()
const editorStore = useEditorStore()

const handlePreview = () => {
  router.push('/preview')
}

const handleSave = async () => {
  // 保存项目逻辑
}

const handleUndo = () => {
  editorStore.undo()
}

const handleRedo = () => {
  editorStore.redo()
}

const handleGenerateCode = () => {
  // 生成代码逻辑
}
</script>

<template>
  <div class="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4">
    <!-- 左侧：操作按钮 -->
    <div class="flex items-center space-x-2">
      <ToolbarButton icon="arrow-left" title="返回" @click="router.back()" />
      <div class="mx-2 h-6 w-px bg-gray-200" />
      <ToolbarButton
        icon="undo"
        title="撤销"
        :disabled="!editorStore.canUndo"
        @click="handleUndo"
      />
      <ToolbarButton
        icon="redo"
        title="重做"
        :disabled="!editorStore.canRedo"
        @click="handleRedo"
      />
    </div>

    <!-- 中间：项目名称 -->
    <div class="flex-1 text-center">
      <span class="text-sm font-medium text-gray-900">
        {{ projectId ? '编辑项目' : '新建项目' }}
      </span>
    </div>

    <!-- 右侧：功能按钮 -->
    <div class="flex items-center space-x-2">
      <ToolbarButton icon="eye" title="预览" @click="handlePreview" />
      <ToolbarButton icon="code" title="生成代码" @click="handleGenerateCode" />
      <button
        @click="handleSave"
        class="rounded bg-indigo-600 px-4 py-1.5 text-sm text-white hover:bg-indigo-700"
      >
        保存
      </button>
    </div>
  </div>
</template>
