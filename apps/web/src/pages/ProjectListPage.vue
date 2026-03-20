<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 模拟项目数据
const projects = ref([
  { id: '1', name: '我的第一个项目', description: '这是一个测试项目', updatedAt: '2024-01-15', cover: '🎨' },
  { id: '2', name: '企业官网', description: '公司官方网站项目', updatedAt: '2024-01-10', cover: '🏢' },
  { id: '3', name: '管理后台', description: '企业内部管理系统', updatedAt: '2024-01-05', cover: '📊' },
  { id: '4', name: '电商小程序', description: '移动端商城应用', updatedAt: '2024-01-01', cover: '🛒' },
])

const handleCreateProject = () => {
  router.push('/editor')
}

const handleEditProject = (id: string) => {
  router.push(`/editor/${id}`)
}

const handleDeleteProject = (_id: string): void => {
  console.log('Delete project:', _id)
}
</script>

<template>
  <div class="min-h-screen bg-dark-bg text-dark-text font-sans">
    <!-- 导航栏 -->
    <nav class="fixed top-0 left-0 right-0 z-100 py-4 bg-[rgba(15,15,20,0.8)] backdrop-blur-xl border-b border-dark-border">
      <div class="w-full px-8 flex justify-between items-center">
        <div class="flex items-center gap-2 cursor-pointer" @click="router.push('/')">
          <span class="text-2xl text-dark-accent">◈</span>
          <span class="font-display text-xl font-semibold">LowCode</span>
        </div>
        <div class="flex items-center gap-8">
          <a href="/" class="text-dark-text-secondary text-sm hover:text-dark-text transition-colors duration-200 no-underline">首页</a>
          <button
            class="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer bg-dark-accent text-white hover:bg-dark-accent-hover hover:shadow-accent-glow"
            @click="handleCreateProject"
          >新建项目</button>
        </div>
      </div>
    </nav>

    <!-- 主要内容 -->
    <main class="pt-24 pb-16 px-8">
      <div class="max-w-[1200px] mx-auto">
        <!-- 页面标题 -->
        <div class="mb-12">
          <h1 class="font-display text-[2.5rem] font-semibold mb-4">我的项目</h1>
          <p class="text-lg text-dark-text-secondary">管理和编辑您的所有项目</p>
        </div>

        <!-- 项目统计 -->
        <div class="flex gap-8 mb-12">
          <div class="flex items-center gap-3 px-6 py-4 bg-dark-surface rounded-xl border border-dark-border">
            <span class="text-3xl text-dark-accent">📁</span>
            <div>
              <div class="font-display text-2xl font-semibold text-dark-accent">{{ projects.length }}</div>
              <div class="text-sm text-dark-text-secondary">项目总数</div>
            </div>
          </div>
          <div class="flex items-center gap-3 px-6 py-4 bg-dark-surface rounded-xl border border-dark-border">
            <span class="text-3xl text-dark-accent">🕐</span>
            <div>
              <div class="font-display text-2xl font-semibold text-dark-accent">最近更新</div>
              <div class="text-sm text-dark-text-secondary">{{ projects[0]?.updatedAt }}</div>
            </div>
          </div>
        </div>

        <!-- 新建项目卡片 -->
        <div
          class="group mb-8 p-8 border-2 border-dashed border-dark-border rounded-xl cursor-pointer transition-all duration-300 hover:border-dark-accent hover:bg-dark-surface/50"
          @click="handleCreateProject"
        >
          <div class="flex flex-col items-center justify-center py-8">
            <div class="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-dark-surface border border-dark-border group-hover:bg-dark-accent group-hover:border-dark-accent transition-all duration-300">
              <span class="text-3xl text-dark-accent group-hover:text-white transition-colors duration-300">+</span>
            </div>
            <h3 class="text-lg font-semibold mb-2">创建新项目</h3>
            <p class="text-sm text-dark-text-secondary">从空白模板开始构建您的应用</p>
          </div>
        </div>

        <!-- 项目列表 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="project in projects"
            :key="project.id"
            class="group relative bg-dark-surface border border-dark-border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-dark-accent hover:shadow-card-hover"
            @click="handleEditProject(project.id)"
          >
            <!-- 项目封面 -->
            <div class="h-32 flex items-center justify-center bg-dark-bg border-b border-dark-border">
              <span class="text-5xl">{{ project.cover }}</span>
            </div>

            <!-- 项目信息 -->
            <div class="p-6">
              <h3 class="text-lg font-semibold mb-2 group-hover:text-dark-accent transition-colors duration-300">{{ project.name }}</h3>
              <p class="text-sm text-dark-text-secondary mb-4 line-clamp-2">{{ project.description }}</p>
              <div class="flex items-center justify-between">
                <span class="text-xs text-dark-text-secondary">更新于 {{ project.updatedAt }}</span>
                <button
                  @click.stop="handleDeleteProject(project.id)"
                  class="text-sm text-dark-text-secondary hover:text-red-400 transition-colors duration-200"
                >
                  删除
                </button>
              </div>
            </div>

            <!-- 悬停显示编辑按钮 -->
            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span class="px-3 py-1 text-xs bg-dark-accent text-white rounded-full">编辑</span>
            </div>
          </div>
        </div>

        <!-- 空状态提示 -->
        <div v-if="projects.length === 0" class="text-center py-16">
          <div class="text-6xl mb-4">📭</div>
          <h3 class="text-xl font-semibold mb-2">暂无项目</h3>
          <p class="text-dark-text-secondary mb-6">创建您的第一个项目开始使用</p>
          <button
            class="px-6 py-3 bg-dark-accent text-white rounded-lg font-medium hover:bg-dark-accent-hover hover:shadow-accent-glow transition-all duration-300"
            @click="handleCreateProject"
          >
            立即创建
          </button>
        </div>
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="px-8 py-8 border-t border-dark-border">
      <div class="max-w-[1200px] mx-auto flex justify-between items-center">
        <div class="flex items-center gap-2">
          <span class="text-xl text-dark-accent">◈</span>
          <span class="font-display text-xl font-semibold">LowCode</span>
        </div>
        <p class="text-sm text-dark-text-secondary">© 2026 LowCode Platform. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* 文字截断 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
