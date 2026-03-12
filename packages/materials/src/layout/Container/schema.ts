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
}

export const ContainerDefinition: ComponentDefinition = {
  name: 'Container',
  label: '容器',
  category: 'layout',
  propsSchema: containerProps,
  defaultProps: {
    fluid: false,
    padding: '20px',
    backgroundColor: '#ffffff',
    minHeight: '100px',
  },
}
