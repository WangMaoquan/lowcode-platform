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

// 组件分类
const categories = [
  {
    name: 'basic',
    label: '基础组件',
    components: [
      { ...ButtonDefinition, icon: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122' },
      { ...TextDefinition, icon: 'M4 6h16M4 12h8m-8 6h16' },
      { ...ImageDefinition, icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    ],
  },
  {
    name: 'layout',
    label: '布局组件',
    components: [
      { ...ContainerDefinition, icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z' },
      { ...RowDefinition, icon: 'M4 6h16M4 10h16M4 14h16' },
      { ...ColDefinition, icon: 'M6 4h4v16H6V4zm8 0h4v16h-4V4z' },
    ],
  },
  {
    name: 'form',
    label: '表单组件',
    components: [
      { ...InputDefinition, icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
      { ...SelectDefinition, icon: 'M8 9l4-4 4 4m0 6l-4 4-4-4' },
    ],
  },
  {
    name: 'display',
    label: '展示组件',
    components: [
      { ...CardDefinition, icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
      { ...TableDefinition, icon: 'M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
      { ...TagDefinition, icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' },
    ],
  },
  {
    name: 'chart',
    label: '图表组件',
    components: [
      { ...LineChartDefinition, icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
      { ...BarChartDefinition, icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
      { ...PieChartDefinition, icon: 'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z' },
    ],
  },
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
    categories,
    getComponentDefinitions,
    getComponentDefinition,
    getComponentPropsSchema,
    getComponentsByCategory,
  }
}
