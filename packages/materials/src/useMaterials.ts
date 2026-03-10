import type { ComponentDefinition } from '@lowcode/shared/types'
import { ButtonDefinition } from './basic'

// 组件定义列表
const componentDefinitions: ComponentDefinition[] = [
  ButtonDefinition,
]

/**
 * 获取所有组件定义
 */
export function useMaterials() {
  const getComponentDefinitions = () => {
    return componentDefinitions
  }

  const getComponentDefinition = (name: string) => {
    return componentDefinitions.find(d => d.name === name)
  }

  const getComponentsByCategory = (category: string) => {
    return componentDefinitions.filter(d => d.category === category)
  }

  return {
    getComponentDefinitions,
    getComponentDefinition,
    getComponentsByCategory,
  }
}
