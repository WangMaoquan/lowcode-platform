<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const projects = ref([
  { id: '1', name: '我的第一个项目', description: '这是一个测试项目', updatedAt: '2024-01-01' },
])

const handleCreateProject = () => {
  router.push('/editor')
}

const handleEditProject = (id: string) => {
  router.push(`/editor/${id}`)
}

const handleDeleteProject = (_id: string) => {
  // 删除项目逻辑
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 px-4 py-8">
    <div class="mx-auto max-w-7xl">
      <div class="mb-6 flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-900">我的项目</h1>
        <button
          @click="handleCreateProject"
          class="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          新建项目
        </button>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="project in projects"
          :key="project.id"
          class="cursor-pointer rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-lg"
          @click="handleEditProject(project.id)"
        >
          <h3 class="mb-2 text-lg font-medium text-gray-900">{{ project.name }}</h3>
          <p class="mb-4 text-sm text-gray-500">{{ project.description }}</p>
          <div class="flex items-center justify-between text-sm text-gray-400">
            <span>更新于 {{ project.updatedAt }}</span>
            <button
              @click.stop="handleDeleteProject(project.id)"
              class="text-red-500 hover:text-red-700"
            >
              删除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
