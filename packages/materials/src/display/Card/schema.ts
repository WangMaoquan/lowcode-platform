import type { ComponentDefinition, PropSchema } from '@lowcode/shared'

export const cardProps: Record<string, PropSchema> = {
  title: {
    type: 'string',
    label: '卡片标题',
    default: '卡片标题',
  },
  subTitle: {
    type: 'string',
    label: '副标题',
    default: '',
  },
  content: {
    type: 'string',
    label: '内容',
    default: '卡片内容',
  },
  shadow: {
    type: 'select',
    label: '阴影',
    default: 'hover',
    options: [
      { label: '总是显示', value: 'always' },
      { label: '悬停时显示', value: 'hover' },
      { label: '从不显示', value: 'never' },
    ],
  },
}

export const CardDefinition: ComponentDefinition = {
  name: 'Card',
  label: '卡片',
  category: 'display',
  propsSchema: cardProps,
  defaultProps: {
    title: '卡片标题',
    subTitle: '',
    content: '卡片内容',
    shadow: 'hover',
  },
  defaultStyles: {
    display: 'block',
    width: '300px',
  },
}
