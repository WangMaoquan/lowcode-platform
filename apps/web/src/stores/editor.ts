import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { PageSchema, ComponentInstance } from '@lowcode/shared/types'

// 递归查找组件
function findComponent(
  components: ComponentInstance[],
  id: string
): ComponentInstance | null {
  for (const component of components) {
    if (component.id === id) return component
    if (component.children && component.children.length > 0) {
      const found = findComponent(component.children, id)
      if (found) return found
    }
  }
  return null
}

// 递归查找并更新组件
function findAndUpdateComponent(
  components: ComponentInstance[],
  id: string,
  updates: Partial<ComponentInstance>
): boolean {
  for (let i = 0; i < components.length; i++) {
    if (components[i].id === id) {
      components[i] = { ...components[i], ...updates }
      return true
    }
    const children = components[i].children
    if (children && children.length > 0) {
      if (findAndUpdateComponent(children, id, updates)) {
        return true
      }
    }
  }
  return false
}

// 递归删除组件
function findAndRemoveComponent(
  components: ComponentInstance[],
  id: string
): boolean {
  for (let i = 0; i < components.length; i++) {
    if (components[i].id === id) {
      components.splice(i, 1)
      return true
    }
    const children = components[i].children
    if (children && children.length > 0) {
      if (findAndRemoveComponent(children, id)) {
        return true
      }
    }
  }
  return false
}

// 生成新的 UUID
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// 递归深拷贝组件并生成新 ID
function cloneComponentWithNewId(component: ComponentInstance): ComponentInstance {
  const cloned = { ...component, id: generateUUID() }
  if (cloned.children && cloned.children.length > 0) {
    cloned.children = cloned.children.map(child => cloneComponentWithNewId(child))
  }
  return cloned
}

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
    return findComponent(page.value.components, selectedId.value)
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
    saveHistory()
    findAndUpdateComponent(page.value.components, id, updates)
  }

  function removeComponent(id: string) {
    saveHistory()
    findAndRemoveComponent(page.value.components, id)
    if (selectedId.value === id) {
      selectedId.value = null
    }
  }

  function reorderComponents(newComponents: ComponentInstance[]) {
    saveHistory()
    page.value.components = newComponents
  }

  // 复制组件到剪贴板
  function copyComponent() {
    if (!selectedId.value) return
    const component = findComponent(page.value.components, selectedId.value)
    if (component) {
      clipboard.value = JSON.parse(JSON.stringify(component))
    }
  }

  // 粘贴组件
  function pasteComponent(targetParentId?: string) {
    if (!clipboard.value) return
    saveHistory()

    const clonedComponent = cloneComponentWithNewId(clipboard.value)

    if (targetParentId) {
      // 粘贴到指定容器中
      const parent = findComponent(page.value.components, targetParentId)
      if (parent && parent.children) {
        parent.children.push(clonedComponent)
      }
    } else {
      // 粘贴到根级别
      page.value.components.push(clonedComponent)
    }

    // 选中新粘贴的组件
    selectedId.value = clonedComponent.id
  }

  // 剪切组件
  function cutComponent() {
    if (!selectedId.value) return
    copyComponent()
    removeComponent(selectedId.value)
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
    reorderComponents,
    copyComponent,
    pasteComponent,
    cutComponent,
    undo,
    redo,
    setPage,
    reset,
  }
})
