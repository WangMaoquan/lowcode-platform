import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { PageSchema, ComponentInstance } from '@lowcode/shared/types'

export const useEditorStore = defineStore('editor', () => {
  // 页面数据
  const page = ref<PageSchema>({
    id: '',
    name: '未命名页面',
    components: [],
    styles: {},
  })

  // 选中状态
  const selectedId = ref<string | null>(null)

  // 历史记录
  const history = ref<PageSchema[]>([])
  const historyIndex = ref(-1)

  // 剪贴板
  const clipboard = ref<ComponentInstance | null>(null)

  // 计算属性
  const canUndo = computed(() => historyIndex.value > 0)
  const canRedo = computed(() => historyIndex.value < history.value.length - 1)

  const selectedComponent = computed(() => {
    if (!selectedId.value) return null
    return page.value.components.find(c => c.id === selectedId.value)
  })

  // 方法
  function selectComponent(id: string) {
    selectedId.value = id
  }

  function addComponent(component: ComponentInstance) {
    saveHistory()
    page.value.components.push(component)
  }

  function updateComponent(id: string, updates: Partial<ComponentInstance>) {
    const index = page.value.components.findIndex(c => c.id === id)
    if (index !== -1) {
      saveHistory()
      page.value.components[index] = { ...page.value.components[index], ...updates }
    }
  }

  function removeComponent(id: string) {
    saveHistory()
    page.value.components = page.value.components.filter(c => c.id !== id)
    if (selectedId.value === id) {
      selectedId.value = null
    }
  }

  function saveHistory() {
    // 截断当前索引之后的历史
    history.value = history.value.slice(0, historyIndex.value + 1)
    // 添加当前状态
    history.value.push(JSON.parse(JSON.stringify(page.value)))
    historyIndex.value = history.value.length - 1
  }

  function undo() {
    if (canUndo.value) {
      historyIndex.value--
      page.value = JSON.parse(JSON.stringify(history.value[historyIndex.value]))
    }
  }

  function redo() {
    if (canRedo.value) {
      historyIndex.value++
      page.value = JSON.parse(JSON.stringify(history.value[historyIndex.value]))
    }
  }

  function setPage(newPage: PageSchema) {
    page.value = newPage
    saveHistory()
  }

  function reset() {
    page.value = {
      id: '',
      name: '未命名页面',
      components: [],
      styles: {},
    }
    selectedId.value = null
    history.value = []
    historyIndex.value = -1
    saveHistory()
  }

  return {
    page,
    selectedId,
    history,
    historyIndex,
    clipboard,
    canUndo,
    canRedo,
    selectedComponent,
    selectComponent,
    addComponent,
    updateComponent,
    removeComponent,
    undo,
    redo,
    setPage,
    reset,
  }
})
