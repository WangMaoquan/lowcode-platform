import { defineAsyncComponent } from 'vue'
import type { Component } from 'vue'

// 组件名称到实际 Vue 组件的映射 - 使用动态路径
const componentPaths: Record<string, string> = {
  // 基础组件
  Button: './basic/Button/index.vue',
  Text: './basic/Text/index.vue',
  Image: './basic/Image/index.vue',
  // 表单组件
  Input: './form/Input/index.vue',
  Select: './form/Select/index.vue',
  // 布局组件
  Container: './layout/Container/index.vue',
  Row: './layout/Row/index.vue',
  Col: './layout/Col/index.vue',
  // 展示组件
  Card: './display/Card/index.vue',
  Table: './display/Table/index.vue',
  Tag: './display/Tag/index.vue',
  // 图表组件
  LineChart: './chart/LineChart/index.vue',
  BarChart: './chart/BarChart/index.vue',
  PieChart: './chart/PieChart/index.vue',
}

// 组件缓存
const componentCache: Record<string, Component> = {}

/**
 * 根据组件名称获取 Vue 组件（同步，返回异步组件）
 */
export function getComponentAsync(name: string): Component | undefined {
  if (componentCache[name]) {
    return componentCache[name]
  }

  const path = componentPaths[name]
  if (!path) return undefined

  // 使用动态 import
  const asyncComp = defineAsyncComponent(() => import(/* @vite-ignore */ path))
  componentCache[name] = asyncComp
  return asyncComp
}

/**
 * 根据组件名称获取 Vue 组件（异步）
 */
export async function getComponent(name: string): Promise<Component | undefined> {
  if (componentCache[name]) {
    return componentCache[name]
  }

  const path = componentPaths[name]
  if (!path) return undefined

  try {
    const module = await import(/* @vite-ignore */ path)
    componentCache[name] = module.default
    return module.default
  } catch {
    return undefined
  }
}

/**
 * 获取所有可用的组件名称
 */
export function getComponentNames(): string[] {
  return Object.keys(componentPaths)
}

export { componentPaths }
