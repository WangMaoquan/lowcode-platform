<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { useMaterials } from '@lowcode/materials'
import EditorCanvas from '@/editor/canvas/EditorCanvas.vue'
import ComponentTree from '@/editor/component-tree/ComponentTree.vue'
import PropertyPanel from '@/editor/property-panel/PropertyPanel.vue'

const editorStore = useEditorStore()
const { categories } = useMaterials()

const activeTab = ref('components')
const searchQuery = ref('')
const showShortcuts = ref(false)

// 键盘快捷键处理
const handleKeydown = (e: KeyboardEvent) => {
  // 检查是否在输入框中
  const target = e.target as HTMLElement
  if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
    return
  }

  // Ctrl/Cmd + ?: 显示快捷键
  if ((e.ctrlKey || e.metaKey) && e.key === '?') {
    e.preventDefault()
    showShortcuts.value = true
    return
  }

  // Ctrl/Cmd + C: 复制
  if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
    e.preventDefault()
    editorStore.copyComponent()
  }
  // Ctrl/Cmd + V: 粘贴
  else if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
    e.preventDefault()
    editorStore.pasteComponent()
  }
  // Ctrl/Cmd + X: 剪切
  else if ((e.ctrlKey || e.metaKey) && e.key === 'x') {
    e.preventDefault()
    editorStore.cutComponent()
  }
  // Ctrl/Cmd + Z: 撤销
  else if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
    e.preventDefault()
    editorStore.undo()
  }
  // Ctrl/Cmd + Shift + Z: 重做
  else if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) {
    e.preventDefault()
    editorStore.redo()
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
  <div class="h-screen flex flex-col bg-dark-bg">
    <!-- Top Navigation Bar -->
    <header class="h-14 bg-dark-surface border-b border-dark-border flex items-center justify-between px-4 flex-shrink-0">
      <!-- Left: Logo & Project Info -->
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-dark-accent rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <span class="text-dark-text font-semibold">LowCode</span>
        </div>
        <div class="h-6 w-px bg-dark-border"></div>
        <div class="flex items-center gap-2">
          <span class="text-dark-text-secondary text-sm">{{ editorStore.page.name || '未命名项目' }}</span>
          <button class="p-1 text-dark-text-secondary hover:text-dark-text transition-colors">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Center: Undo/Redo & Actions -->
      <div class="flex items-center gap-2">
        <div class="flex items-center bg-dark-bg rounded-lg p-1">
          <button
            @click="editorStore.undo"
            :disabled="!editorStore.canUndo"
            class="p-2 text-dark-text-secondary hover:text-dark-text disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="撤销 (Ctrl+Z)"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </button>
          <button
            @click="editorStore.redo"
            :disabled="!editorStore.canRedo"
            class="p-2 text-dark-text-secondary hover:text-dark-text disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="重做 (Ctrl+Shift+Z)"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
            </svg>
          </button>
        </div>
        <div class="h-6 w-px bg-dark-border"></div>
        <button
          @click="showShortcuts = true"
          class="p-2 text-dark-text-secondary hover:text-dark-text transition-colors"
          title="快捷键 (Ctrl+?)"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      <!-- Right: Preview & Export -->
      <div class="flex items-center gap-2">
        <button class="flex items-center gap-2 px-4 py-2 text-dark-text-secondary hover:text-dark-text transition-colors">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span class="text-sm">预览</span>
        </button>
        <button class="flex items-center gap-2 px-4 py-2 bg-dark-accent text-white rounded-lg hover:bg-dark-accent-hover transition-colors">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span class="text-sm">导出代码</span>
        </button>
        <button class="p-2 text-dark-text-secondary hover:text-dark-text transition-colors">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </button>
      </div>
    </header>

    <!-- Main Editor Area -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Left Sidebar -->
      <aside class="w-72 bg-dark-surface border-r border-dark-border flex flex-col flex-shrink-0">
        <!-- Tabs -->
        <div class="flex border-b border-dark-border">
          <button
            @click="activeTab = 'components'"
            :class="[
              'flex-1 py-3 text-sm font-medium transition-colors',
              activeTab === 'components' ? 'text-dark-accent border-b-2 border-dark-accent' : 'text-dark-text-secondary hover:text-dark-text'
            ]"
          >
            组件
          </button>
          <button
            @click="activeTab = 'layers'"
            :class="[
              'flex-1 py-3 text-sm font-medium transition-colors',
              activeTab === 'layers' ? 'text-dark-accent border-b-2 border-dark-accent' : 'text-dark-text-secondary hover:text-dark-text'
            ]"
          >
            图层
          </button>
        </div>

        <!-- Components Tab -->
        <div v-if="activeTab === 'components'" class="flex-1 overflow-y-auto">
          <!-- Search -->
          <div class="p-3">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索组件..."
                class="w-full bg-dark-bg border border-dark-border rounded-lg pl-9 pr-3 py-2 text-sm text-dark-text placeholder-dark-text-secondary focus:ring-2 focus:ring-dark-accent focus:border-transparent"
              />
              <svg class="w-4 h-4 text-dark-text-secondary absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <!-- Component Categories -->
          <div class="px-3 pb-3 space-y-4">
            <div v-for="category in categories" :key="category.name">
              <div class="text-xs font-medium text-dark-text-secondary uppercase tracking-wider mb-2 px-1">
                {{ category.label }}
              </div>
              <div class="grid grid-cols-3 gap-2">
                <div
                  v-for="component in category.components"
                  :key="component.name"
                  draggable="true"
                  @dragstart="(e) => {
                    e.dataTransfer?.setData('application/json', JSON.stringify({
                      type: 'new',
                      name: component.name
                    }))
                  }"
                  class="group bg-dark-bg hover:bg-dark-accent border border-dark-border hover:border-dark-accent rounded-lg p-3 cursor-move transition-all"
                >
                  <div class="w-8 h-8 mx-auto mb-2 text-dark-text-secondary group-hover:text-white">
                    <svg class="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="component.icon || 'M4 6h16M4 12h16M4 18h16'" />
                    </svg>
                  </div>
                  <div class="text-xs text-center text-dark-text-secondary group-hover:text-white truncate">
                    {{ component.label }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Layers Tab -->
        <div v-else class="flex-1 overflow-y-auto">
          <ComponentTree />
        </div>
      </aside>

      <!-- Canvas Area -->
      <main class="flex-1 bg-dark-bg overflow-auto p-4">
        <EditorCanvas />
      </main>

      <!-- Right Sidebar - Properties -->
      <aside class="w-80 bg-dark-surface border-l border-dark-border flex flex-col flex-shrink-0">
        <div class="flex items-center justify-between px-4 py-3 border-b border-dark-border">
          <span class="text-sm font-medium text-dark-text">属性面板</span>
          <button class="text-dark-text-secondary hover:text-dark-text">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        <div class="flex-1 overflow-y-auto">
          <PropertyPanel />
        </div>
      </aside>
    </div>

    <!-- Keyboard Shortcuts Modal -->
    <div
      v-if="showShortcuts"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="showShortcuts = false"
    >
      <div class="bg-dark-surface rounded-xl border border-dark-border w-full max-w-md mx-4">
        <div class="flex items-center justify-between px-6 py-4 border-b border-dark-border">
          <h3 class="text-lg font-semibold text-dark-text">键盘快捷键</h3>
          <button @click="showShortcuts = false" class="text-dark-text-secondary hover:text-dark-text">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-6 space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-dark-text-secondary">复制</span>
            <kbd class="px-2 py-1 bg-dark-bg border border-dark-border rounded text-sm text-dark-text-secondary">Ctrl + C</kbd>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-dark-text-secondary">粘贴</span>
            <kbd class="px-2 py-1 bg-dark-bg border border-dark-border rounded text-sm text-dark-text-secondary">Ctrl + V</kbd>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-dark-text-secondary">剪切</span>
            <kbd class="px-2 py-1 bg-dark-bg border border-dark-border rounded text-sm text-dark-text-secondary">Ctrl + X</kbd>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-dark-text-secondary">撤销</span>
            <kbd class="px-2 py-1 bg-dark-bg border border-dark-border rounded text-sm text-dark-text-secondary">Ctrl + Z</kbd>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-dark-text-secondary">重做</span>
            <kbd class="px-2 py-1 bg-dark-bg border border-dark-border rounded text-sm text-dark-text-secondary">Ctrl + Shift + Z</kbd>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-dark-text-secondary">删除</span>
            <kbd class="px-2 py-1 bg-dark-bg border border-dark-border rounded text-sm text-dark-text-secondary">Delete</kbd>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-dark-text-secondary">显示快捷键</span>
            <kbd class="px-2 py-1 bg-dark-bg border border-dark-border rounded text-sm text-dark-text-secondary">Ctrl + ?</kbd>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
