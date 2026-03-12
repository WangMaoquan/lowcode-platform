import type { ComponentDefinition, PropSchema } from '@lowcode/shared'

export const buttonProps: Record<string, PropSchema> = {
  text: {
    type: 'string',
    label: '按钮文本',
    default: '按钮',
  },
  type: {
    type: 'select',
    label: '按钮类型',
    default: 'default',
    options: [
      { label: '主要', value: 'primary' },
      { label: '默认', value: 'default' },
      { label: '危险', value: 'danger' },
      { label: '成功', value: 'success' },
    ],
  },
  size: {
    type: 'select',
    label: '按钮大小',
    default: 'medium',
    options: [
      { label: '小', value: 'small' },
      { label: '中', value: 'medium' },
      { label: '大', value: 'large' },
    ],
  },
  disabled: {
    type: 'boolean',
    label: '禁用',
    default: false,
  },
  loading: {
    type: 'boolean',
    label: '加载中',
    default: false,
  },
}

export const ButtonDefinition: ComponentDefinition = {
  name: 'Button',
  label: '按钮',
  category: 'basic',
  propsSchema: buttonProps,
  defaultProps: {
    text: '按钮',
    type: 'default',
    size: 'medium',
    disabled: false,
    loading: false,
  },
}
