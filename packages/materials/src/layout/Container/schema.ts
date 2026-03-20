import type { ComponentDefinition, PropSchema } from '@lowcode/shared'

export const containerProps: Record<string, PropSchema> = {
  fluid: {
    type: 'boolean',
    label: '全宽容器',
    default: false,
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
  },
  defaultStyles: {
    display: 'block',
    'min-height': '100px',
  },
}
