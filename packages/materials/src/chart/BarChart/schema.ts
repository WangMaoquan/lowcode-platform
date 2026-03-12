import type { ComponentDefinition, PropSchema } from '@lowcode/shared'

export const barChartProps: Record<string, PropSchema> = {
  title: {
    type: 'string',
    label: '图表标题',
    default: '柱状图',
  },
  xAxisData: {
    type: 'array',
    label: 'X轴数据',
    default: ['1月', '2月', '3月', '4月', '5月', '6月'],
  },
  seriesData: {
    type: 'array',
    label: '系列数据',
    default: [820, 932, 901, 934, 1290, 1330],
  },
  seriesName: {
    type: 'string',
    label: '系列名称',
    default: '销量',
  },
  horizontal: {
    type: 'boolean',
    label: '横向柱状图',
    default: false,
  },
  stacked: {
    type: 'boolean',
    label: '堆叠',
    default: false,
  },
  height: {
    type: 'string',
    label: '图表高度',
    default: '300px',
  },
}

export const BarChartDefinition: ComponentDefinition = {
  name: 'BarChart',
  label: '柱状图',
  category: 'chart',
  propsSchema: barChartProps,
  defaultProps: {
    title: '柱状图',
    xAxisData: ['1月', '2月', '3月', '4月', '5月', '6月'],
    seriesData: [820, 932, 901, 934, 1290, 1330],
    seriesName: '销量',
    horizontal: false,
    stacked: false,
    height: '300px',
  },
}
