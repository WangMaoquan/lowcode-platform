import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { generateUUID } from '@lowcode/shared'
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

// 递归深拷贝组件并生成新 ID
function cloneComponentWithNewId(component: ComponentInstance): ComponentInstance {
  const cloned = { ...component, id: generateUUID() }
  if (cloned.children && cloned.children.length > 0) {
    cloned.children = cloned.children.map(child => cloneComponentWithNewId(child))
  }
  return cloned
}

export const useEditorStore = defineStore('editor', () => {
  // 当前项目ID（用于保存）
  const projectId = ref<string | null>(null)

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

  // 是否有未保存的更改
  const hasUnsavedChanges = computed(() => {
    // 如果有项目ID，说明是从数据库加载的，需要检测变更
    // 简单判断：history 中有记录就算有更改
    return history.value.length > 1
  })

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
    projectId.value = null
    selectedId.value = null
    history.value = []
    historyIndex.value = -1
    saveHistory()
  }

  // 设置项目ID
  function setProjectId(id: string | null) {
    projectId.value = id
  }

  return {
    projectId,
    page,
    selectedId,
    history,
    historyIndex,
    clipboard,
    canUndo,
    canRedo,
    hasUnsavedChanges,
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
    setProjectId,
    reset,
  }
})
