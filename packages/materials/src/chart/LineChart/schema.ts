import type { ComponentDefinition, PropSchema } from '@lowcode/shared'

export const lineChartProps: Record<string, PropSchema> = {
  title: {
    type: 'string',
    label: '图表标题',
    default: '折线图',
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
  smooth: {
    type: 'boolean',
    label: '平滑曲线',
    default: false,
  },
  areaStyle: {
    type: 'boolean',
    label: '面积填充',
    default: false,
  },
}

export const LineChartDefinition: ComponentDefinition = {
  name: 'LineChart',
  label: '折线图',
  category: 'chart',
  propsSchema: lineChartProps,
  defaultProps: {
    title: '折线图',
    xAxisData: ['1月', '2月', '3月', '4月', '5月', '6月'],
    seriesData: [820, 932, 901, 934, 1290, 1330],
    seriesName: '销量',
    smooth: false,
    areaStyle: false,
  },
  defaultStyles: {
    display: 'block',
    width: '100%',
    height: '300px',
  },
}
