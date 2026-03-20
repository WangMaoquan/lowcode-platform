import type { ComponentDefinition, PropSchema } from '@lowcode/shared'

export const pieChartProps: Record<string, PropSchema> = {
  title: {
    type: 'string',
    label: '图表标题',
    default: '饼图',
  },
  seriesData: {
    type: 'array',
    label: '数据',
    default: [
      { name: '选项1', value: 1048 },
      { name: '选项2', value: 735 },
      { name: '选项3', value: 580 },
      { name: '选项4', value: 484 },
      { name: '选项5', value: 300 },
    ],
  },
  radius: {
    type: 'string',
    label: '半径',
    default: '50%',
  },
  center: {
    type: 'string',
    label: '圆心位置',
    default: '50%, 50%',
  },
  roseType: {
    type: 'select',
    label: '玫瑰图类型',
    default: 'none',
    options: [
      { label: '普通饼图', value: 'none' },
      { label: '半径', value: 'radius' },
      { label: '面积', value: 'area' },
    ],
  },
}

export const PieChartDefinition: ComponentDefinition = {
  name: 'PieChart',
  label: '饼图',
  category: 'chart',
  propsSchema: pieChartProps,
  defaultProps: {
    title: '饼图',
    seriesData: [
      { name: '选项1', value: 1048 },
      { name: '选项2', value: 735 },
      { name: '选项3', value: 580 },
      { name: '选项4', value: 484 },
      { name: '选项5', value: 300 },
    ],
    radius: '50%',
    center: '50%, 50%',
    roseType: 'none',
  },
  defaultStyles: {
    display: 'block',
    width: '100%',
    height: '300px',
  },
}
