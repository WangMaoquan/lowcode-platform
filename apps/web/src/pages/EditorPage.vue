<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useEditorStore } from '@/stores/editor'
import { useProjectStore } from '@/stores/project'
import { useMaterials } from '@lowcode/materials'
import { setupRouteGuard } from '@/router'
import EditorCanvas from '@/editor/canvas/EditorCanvas.vue'
import ComponentTree from '@/editor/component-tree/ComponentTree.vue'
import PropertyPanel from '@/editor/property-panel/PropertyPanel.vue'

const router = useRouter()
const route = useRoute()
const editorStore = useEditorStore()
const projectStore = useProjectStore()
const { categories } = useMaterials()

const activeTab = ref('components')
const searchQuery = ref('')
const showShortcuts = ref(false)
const saving = ref(false)
const loading = ref(false)

// 监听路由参数，加载项目数据
watch(
  () => route.params.id,
  async (newId) => {
    if (newId) {
      loading.value = true
      try {
        const project = await projectStore.fetchProject(newId as string)
        if (project?.schema) {
          editorStore.setPage({
            id: project.id,
            name: project.name,
            components: project.schema.components || [],
            styles: project.schema.styles || {},
          })
          editorStore.setProjectId(project.id)
        }
      } catch (error) {
        console.error('加载项目失败:', error)
      } finally {
        loading.value = false
      }
    }
  },
  { immediate: true }
)

// 保存项目
const handleSave = async () => {
  if (saving.value) return
  saving.value = true

  try {
    const pageData = {
      name: editorStore.page.name,
      components: editorStore.page.components,
      styles: editorStore.page.styles,
    }

    if (editorStore.projectId) {
      // 更新现有项目
      await projectStore.updateProject(editorStore.projectId, {
        name: editorStore.page.name,
        schema: pageData,
      })
    } else {
      // 创建新项目
      const project = await projectStore.createProject({
        name: editorStore.page.name,
        schema: pageData,
      })
      editorStore.setProjectId(project.id)
    }
  } catch (error) {
    console.error('保存项目失败:', error)
  } finally {
    saving.value = false
  }
}

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
  // 设置路由守卫
  setupRouteGuard(() => editorStore)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="bg-dark-bg flex h-screen flex-col">
    <!-- Top Navigation Bar -->
    <header
      class="bg-dark-surface border-dark-border flex h-14 flex-shrink-0 items-center justify-between border-b px-4"
    >
      <!-- Left: Logo & Project Info -->
      <div class="flex items-center gap-4">
        <div class="flex cursor-pointer items-center gap-2" @click="router.push('/')">
          <div class="bg-dark-accent flex h-8 w-8 items-center justify-center rounded-lg">
            <svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <span class="text-dark-text font-semibold">LowCode</span>
        </div>
        <div class="bg-dark-border h-6 w-px"></div>
        <div class="flex items-center gap-2">
          <span class="text-dark-text-secondary text-sm">
            {{ editorStore.page.name || '未命名项目' }}
          </span>
          <button class="text-dark-text-secondary hover:text-dark-text p-1 transition-colors">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Center: Undo/Redo & Actions -->
      <div class="flex items-center gap-2">
        <div class="bg-dark-bg flex items-center rounded-lg p-1">
          <button
            @click="editorStore.undo"
            :disabled="!editorStore.canUndo"
            class="text-dark-text-secondary hover:text-dark-text p-2 transition-colors disabled:cursor-not-allowed disabled:opacity-30"
            title="撤销 (Ctrl+Z)"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
              />
            </svg>
          </button>
          <button
            @click="editorStore.redo"
            :disabled="!editorStore.canRedo"
            class="text-dark-text-secondary hover:text-dark-text p-2 transition-colors disabled:cursor-not-allowed disabled:opacity-30"
            title="重做 (Ctrl+Shift+Z)"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6"
              />
            </svg>
          </button>
        </div>
        <div class="bg-dark-border h-6 w-px"></div>
        <button
          @click="showShortcuts = true"
          class="text-dark-text-secondary hover:text-dark-text p-2 transition-colors"
          title="快捷键 (Ctrl+?)"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>

      <!-- Right: Preview & Export -->
      <div class="flex items-center gap-2">
        <button
          @click="handleSave"
          :disabled="saving"
          class="text-dark-text-secondary hover:text-dark-text flex items-center gap-2 px-4 py-2 transition-colors disabled:opacity-50"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
            />
          </svg>
          <span class="text-sm">{{ saving ? '保存中...' : '保存' }}</span>
        </button>
        <button
          class="text-dark-text-secondary hover:text-dark-text flex items-center gap-2 px-4 py-2 transition-colors"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <span class="text-sm">预览</span>
        </button>
        <button
          class="bg-dark-accent hover:bg-dark-accent-hover flex items-center gap-2 rounded-lg px-4 py-2 text-white transition-colors"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          <span class="text-sm">导出代码</span>
        </button>
        <button class="text-dark-text-secondary hover:text-dark-text p-2 transition-colors">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </button>
      </div>
    </header>

    <!-- Main Editor Area -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Left Sidebar -->
      <aside class="bg-dark-surface border-dark-border flex w-72 flex-shrink-0 flex-col border-r">
        <!-- Tabs -->
        <div class="border-dark-border flex border-b">
          <button
            @click="activeTab = 'components'"
            :class="[
              'flex-1 py-3 text-sm font-medium transition-colors',
              activeTab === 'components'
                ? 'text-dark-accent border-dark-accent border-b-2'
                : 'text-dark-text-secondary hover:text-dark-text',
            ]"
          >
            组件
          </button>
          <button
            @click="activeTab = 'layers'"
            :class="[
              'flex-1 py-3 text-sm font-medium transition-colors',
              activeTab === 'layers'
                ? 'text-dark-accent border-dark-accent border-b-2'
                : 'text-dark-text-secondary hover:text-dark-text',
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
                class="bg-dark-bg border-dark-border text-dark-text placeholder-dark-text-secondary focus:ring-dark-accent w-full rounded-lg border py-2 pr-3 pl-9 text-sm focus:border-transparent focus:ring-2"
              />
              <svg
                class="text-dark-text-secondary absolute top-2.5 left-3 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <!-- Component Categories -->
          <div class="space-y-4 px-3 pb-3">
            <div v-for="category in categories" :key="category.name">
              <div
                class="text-dark-text-secondary mb-2 px-1 text-xs font-medium tracking-wider uppercase"
              >
                {{ category.label }}
              </div>
              <div class="grid grid-cols-3 gap-2">
                <div
                  v-for="component in category.components"
                  :key="component.name"
                  draggable="true"
                  @dragstart="
                    (e) => {
                      e.dataTransfer?.setData(
                        'application/json',
                        JSON.stringify({
                          type: 'new',
                          name: component.name,
                        })
                      )
                    }
                  "
                  class="group bg-dark-bg hover:bg-dark-accent border-dark-border hover:border-dark-accent cursor-move rounded-lg border p-3 transition-all"
                >
                  <div class="text-dark-text-secondary mx-auto mb-2 h-8 w-8 group-hover:text-white">
                    <svg
                      class="h-full w-full"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        :d="component.icon || 'M4 6h16M4 12h16M4 18h16'"
                      />
                    </svg>
                  </div>
                  <div
                    class="text-dark-text-secondary truncate text-center text-xs group-hover:text-white"
                  >
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
      <main class="bg-dark-bg flex-1 overflow-auto p-4">
        <EditorCanvas />
      </main>

      <!-- Right Sidebar - Properties -->
      <aside class="bg-dark-surface border-dark-border flex w-80 flex-shrink-0 flex-col border-l">
        <div class="border-dark-border flex items-center justify-between border-b px-4 py-3">
          <span class="text-dark-text text-sm font-medium">属性面板</span>
          <button class="text-dark-text-secondary hover:text-dark-text">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
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
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      @click.self="showShortcuts = false"
    >
      <div class="bg-dark-surface border-dark-border mx-4 w-full max-w-md rounded-xl border">
        <div class="border-dark-border flex items-center justify-between border-b px-6 py-4">
          <h3 class="text-dark-text text-lg font-semibold">键盘快捷键</h3>
          <button
            @click="showShortcuts = false"
            class="text-dark-text-secondary hover:text-dark-text"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="space-y-3 p-6">
          <div class="flex items-center justify-between">
            <span class="text-dark-text-secondary">复制</span>
            <kbd
              class="bg-dark-bg border-dark-border text-dark-text-secondary rounded border px-2 py-1 text-sm"
            >
              Ctrl + C
            </kbd>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-dark-text-secondary">粘贴</span>
            <kbd
              class="bg-dark-bg border-dark-border text-dark-text-secondary rounded border px-2 py-1 text-sm"
            >
              Ctrl + V
            </kbd>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-dark-text-secondary">剪切</span>
            <kbd
              class="bg-dark-bg border-dark-border text-dark-text-secondary rounded border px-2 py-1 text-sm"
            >
              Ctrl + X
            </kbd>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-dark-text-secondary">撤销</span>
            <kbd
              class="bg-dark-bg border-dark-border text-dark-text-secondary rounded border px-2 py-1 text-sm"
            >
              Ctrl + Z
            </kbd>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-dark-text-secondary">重做</span>
            <kbd
              class="bg-dark-bg border-dark-border text-dark-text-secondary rounded border px-2 py-1 text-sm"
            >
              Ctrl + Shift + Z
            </kbd>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-dark-text-secondary">删除</span>
            <kbd
              class="bg-dark-bg border-dark-border text-dark-text-secondary rounded border px-2 py-1 text-sm"
            >
              Delete
            </kbd>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-dark-text-secondary">显示快捷键</span>
            <kbd
              class="bg-dark-bg border-dark-border text-dark-text-secondary rounded border px-2 py-1 text-sm"
            >
              Ctrl + ?
            </kbd>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
