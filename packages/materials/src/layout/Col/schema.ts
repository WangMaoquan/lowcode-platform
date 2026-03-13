import type { ComponentDefinition, PropSchema } from '@lowcode/shared'

export const colProps: Record<string, PropSchema> = {
  span: {
    type: 'number',
    label: '栅格宽度(1-24)',
    default: 24,
  },
  offset: {
    type: 'number',
    label: '左侧偏移',
    default: 0,
  },
  push: {
    type: 'number',
    label: '右移格数',
    default: 0,
  },
  pull: {
    type: 'number',
    label: '左移格数',
    default: 0,
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

export const ColDefinition: ComponentDefinition = {
  name: 'Col',
  label: '列',
  category: 'layout',
  isContainer: true,
  propsSchema: colProps,
  defaultProps: {
    span: 24,
    offset: 0,
    push: 0,
    pull: 0,
    padding: '0',
    backgroundColor: 'transparent',
    minHeight: 'auto',
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: '#e5e7eb',
    borderRadius: '0px',
  },
}
