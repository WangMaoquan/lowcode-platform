import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PageSchema } from '@lowcode/shared/types'

interface Project {
  id: string
  name: string
  description?: string
  schema: object
  createdAt: string
  updatedAt: string
}

interface CreateProjectDto {
  name: string
  description?: string
  schema?: object
}

interface UpdateProjectDto {
  name?: string
  description?: string
  schema?: object
}

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

export const useProjectStore = defineStore('project', () => {
  const projects = ref<Project[]>([])
  const currentProject = ref<Project | null>(null)
  const loading = ref(false)

  // 获取所有项目
  const fetchProjects = async () => {
    loading.value = true
    try {
      const response = await fetch('/api/projects', {
        headers: getAuthHeaders(),
      })
      if (!response.ok) {
        throw new Error('获取项目列表失败')
      }
      const data = await response.json()
      projects.value = data
      return data
    } catch (error) {
      console.error('获取项目列表失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // 获取单个项目
  const fetchProject = async (id: string) => {
    loading.value = true
    try {
      const response = await fetch(`/api/projects/${id}`, {
        headers: getAuthHeaders(),
      })
      if (!response.ok) {
        throw new Error('获取项目失败')
      }
      const data = await response.json()
      currentProject.value = data
      return data
    } catch (error) {
      console.error('获取项目失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // 创建项目
  const createProject = async (dto: CreateProjectDto) => {
    loading.value = true
    try {
      // 将 page 数据转换为 schema 格式
      const schema = dto.schema || {}
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          name: dto.name,
          description: dto.description,
          schema,
        }),
      })
      if (!response.ok) {
        throw new Error('创建项目失败')
      }
      const data = await response.json()
      projects.value.unshift(data)
      return data
    } catch (error) {
      console.error('创建项目失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // 更新项目
  const updateProject = async (id: string, dto: UpdateProjectDto) => {
    loading.value = true
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          name: dto.name,
          description: dto.description,
          schema: dto.schema,
        }),
      })
      if (!response.ok) {
        throw new Error('更新项目失败')
      }
      const data = await response.json()
      // 更新列表中的项目
      const index = projects.value.findIndex(p => p.id === id)
      if (index !== -1) {
        projects.value[index] = data
      }
      if (currentProject.value?.id === id) {
        currentProject.value = data
      }
      return data
    } catch (error) {
      console.error('更新项目失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // 删除项目
  const deleteProject = async (id: string) => {
    loading.value = true
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      })
      if (!response.ok) {
        throw new Error('删除项目失败')
      }
      // 从列表中移除
      projects.value = projects.value.filter(p => p.id !== id)
      if (currentProject.value?.id === id) {
        currentProject.value = null
      }
    } catch (error) {
      console.error('删除项目失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    projects,
    currentProject,
    loading,
    fetchProjects,
    fetchProject,
    createProject,
    updateProject,
    deleteProject,
  }
})
