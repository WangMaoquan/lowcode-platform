import type { ComponentDefinition } from '@lowcode/shared'
import { ButtonDefinition, TextDefinition, ImageDefinition } from './basic'
import { InputDefinition, SelectDefinition } from './form'
import { ContainerDefinition, RowDefinition, ColDefinition } from './layout'
import { CardDefinition, TableDefinition, TagDefinition } from './display'
import { LineChartDefinition, BarChartDefinition, PieChartDefinition } from './chart'

// 组件定义列表
const componentDefinitions: ComponentDefinition[] = [
  // 基础组件
  ButtonDefinition,
  TextDefinition,
  ImageDefinition,
  // 表单组件
  InputDefinition,
  SelectDefinition,
  // 布局组件
  ContainerDefinition,
  RowDefinition,
  ColDefinition,
  // 展示组件
  CardDefinition,
  TableDefinition,
  TagDefinition,
  // 图表组件
  LineChartDefinition,
  BarChartDefinition,
  PieChartDefinition,
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

  const getComponentPropsSchema = (name: string) => {
    const def = componentDefinitions.find(d => d.name === name)
    return def?.propsSchema || {}
  }

  const getComponentsByCategory = (category: string) => {
    return componentDefinitions.filter(d => d.category === category)
  }

  return {
    getComponentDefinitions,
    getComponentDefinition,
    getComponentPropsSchema,
    getComponentsByCategory,
  }
}
