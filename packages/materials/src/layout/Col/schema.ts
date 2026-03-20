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
  },
  defaultStyles: {
    display: 'block',
    'flex': '1',
  },
}
