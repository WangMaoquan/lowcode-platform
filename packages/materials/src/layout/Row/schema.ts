import type { ComponentDefinition, PropSchema } from '@lowcode/shared'

export const rowProps: Record<string, PropSchema> = {
  gutter: {
    type: 'number',
    label: '栅格间距',
    default: 0,
  },
  justify: {
    type: 'select',
    label: '水平对齐',
    default: 'start',
    options: [
      { label: '左对齐', value: 'start' },
      { label: '居中', value: 'center' },
      { label: '右对齐', value: 'end' },
      { label: '两端对齐', value: 'space-between' },
      { label: '等间距', value: 'space-around' },
      { label: '均匀分布', value: 'space-evenly' },
    ],
  },
  align: {
    type: 'select',
    label: '垂直对齐',
    default: 'top',
    options: [
      { label: '顶部', value: 'top' },
      { label: '居中', value: 'middle' },
      { label: '底部', value: 'bottom' },
      { label: '拉伸', value: 'stretch' },
    ],
  },
  wrap: {
    type: 'boolean',
    label: '换行',
    default: false,
  },
  padding: {
    type: 'string',
    label: '内边距',
    default: '0',
  },
  backgroundColor: {
    type: 'string',
    label: '背景颜色',
    default: 'transparent',
  },
  minHeight: {
    type: 'string',
    label: '最小高度',
    default: 'auto',
  },
  borderWidth: {
    type: 'number',
    label: '边框宽度',
    default: 0,
  },
  borderStyle: {
    type: 'select',
    label: '边框样式',
    default: 'solid',
    options: [
      { label: '实线', value: 'solid' },
      { label: '虚线', value: 'dashed' },
      { label: '点线', value: 'dotted' },
      { label: '无', value: 'none' },
    ],
  },
  borderColor: {
    type: 'string',
    label: '边框颜色',
    default: '#e5e7eb',
  },
  borderRadius: {
    type: 'string',
    label: '圆角',
    default: '0px',
  },
}

export const RowDefinition: ComponentDefinition = {
  name: 'Row',
  label: '行',
  category: 'layout',
  isContainer: true,
  propsSchema: rowProps,
  defaultProps: {
    gutter: 0,
    justify: 'start',
    align: 'top',
    wrap: false,
    padding: '0',
    backgroundColor: 'transparent',
    minHeight: 'auto',
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: '#e5e7eb',
    borderRadius: '0px',
  },
}
