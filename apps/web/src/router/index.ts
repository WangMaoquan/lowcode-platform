import { useEditorStore } from './../stores/editor'
import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/HomePage.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/LoginPage.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/pages/RegisterPage.vue'),
    },
    {
      path: '/editor/:id?',
      name: 'editor',
      component: () => import('@/pages/EditorPage.vue'),
    },
    {
      path: '/preview',
      name: 'preview',
      component: () => import('@/pages/PreviewPage.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('@/pages/ProjectListPage.vue'),
    },
  ],
})

// 路由白名单（离开时不需要提示）
const noPromptRoutes = ['preview']

// 保存 beforeEach 的回调
let beforeEachCallback:
  | ((
      to: RouteLocationNormalized,
      from: RouteLocationNormalized
    ) => boolean | void | Promise<boolean>)
  | null = null

// 导出设置路由守卫的函数
export const setupRouteGuard = (getEditorStore: () => ReturnType<typeof useEditorStore>) => {
  // 如果已经设置过守卫，不再重复设置
  if (beforeEachCallback) {
    return
  }

  beforeEachCallback = async (to, from) => {
    const editorStore = getEditorStore?.()

    // 只有从编辑器页面离开时才检查
    if (from.name === 'editor' && editorStore?.hasUnsavedChanges) {
      // 如果目标是预览页面，不需要提示，也不重置
      if (noPromptRoutes.includes(to.name as string)) {
        return true
      }

      // 显示确认对话框
      const confirmed = window.confirm(
        '您有未保存的更改，确定要离开吗？\n\n点击"确定"将放弃所有未保存的更改。\n点击"取消"留在当前页面。'
      )

      if (!confirmed) {
        return false // 取消导航
      }
    }

    // 离开编辑器时重置 store
    if (from.name === 'editor') {
      const store = getEditorStore?.()
      if (store) {
        store.reset()
      }
    }

    return true
  }

  router.beforeEach(beforeEachCallback)
}

export default router
