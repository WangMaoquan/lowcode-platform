import type { PageSchema } from './component'

export interface Project {
  id: string
  name: string
  description?: string
  schema: PageSchema
  thumbnail?: string
  isPublic: boolean
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateProjectRequest {
  name: string
  description?: string
  schema?: PageSchema
}

export interface UpdateProjectRequest {
  name?: string
  description?: string
  schema?: PageSchema
}

export interface Template {
  id: string
  name: string
  description?: string
  thumbnail?: string
  schema: PageSchema
  category: string
  isBuiltIn: boolean
  createdAt: Date
  updatedAt: Date
}
