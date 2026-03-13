import type { ComponentDefinition, PropSchema } from '@lowcode/shared'

export const containerProps: Record<string, PropSchema> = {
  fluid: {
    type: 'boolean',
    label: '全宽容器',
    default: false,
  },
  padding: {
    type: 'string',
    label: '内边距',
    default: '20px',
  },
  backgroundColor: {
    type: 'string',
    label: '背景颜色',
    default: '#ffffff',
  },
  minHeight: {
    type: 'string',
    label: '最小高度',
    default: '100px',
  },
  maxWidth: {
    type: 'string',
    label: '最大宽度',
    default: '1200px',
  },
  margin: {
    type: 'string',
    label: '外边距',
    default: '0 auto',
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
  boxShadow: {
    type: 'select',
    label: '阴影',
    default: 'none',
    options: [
      { label: '无', value: 'none' },
      { label: '小', value: 'sm' },
      { label: '中', value: 'md' },
      { label: '大', value: 'lg' },
      { label: '特大', value: 'xl' },
    ],
  },
}

export const ContainerDefinition: ComponentDefinition = {
  name: 'Container',
  label: '容器',
  category: 'layout',
  isContainer: true,
  propsSchema: containerProps,
  defaultProps: {
    fluid: false,
    padding: '20px',
    backgroundColor: '#ffffff',
    minHeight: '100px',
    maxWidth: '1200px',
    margin: '0 auto',
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: '#e5e7eb',
    borderRadius: '0px',
    boxShadow: 'none',
  },
}
