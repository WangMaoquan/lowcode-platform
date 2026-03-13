import type { ComponentDefinition, PropSchema } from '@lowcode/shared'

export const tagProps: Record<string, PropSchema> = {
  text: {
    type: 'string',
    label: '标签文本',
    default: '标签',
  },
  type: {
    type: 'select',
    label: '类型',
    default: 'primary',
    options: [
      { label: '主要', value: 'primary' },
      { label: '成功', value: 'success' },
      { label: '警告', value: 'warning' },
      { label: '危险', value: 'danger' },
      { label: '信息', value: 'info' },
    ],
  },
  effect: {
    type: 'select',
    label: '风格',
    default: 'light',
    options: [
      { label: '浅色', value: 'light' },
      { label: '深色', value: 'dark' },
      { label: 'Plain', value: 'plain' },
    ],
  },
  closable: {
    type: 'boolean',
    label: '可关闭',
    default: false,
  },
  round: {
    type: 'boolean',
    label: '圆角',
    default: false,
  },
}

export const TagDefinition: ComponentDefinition = {
  name: 'Tag',
  label: '标签',
  category: 'display',
  propsSchema: tagProps,
  defaultProps: {
    text: '标签',
    type: 'primary',
    effect: 'light',
    closable: false,
    round: false,
  },
  defaultStyles: {
    display: 'inline-block',
  },
}
