import type { ComponentDefinition, PropSchema } from '@lowcode/shared'

export const inputProps: Record<string, PropSchema> = {
  placeholder: {
    type: 'string',
    label: '占位符',
    default: '请输入',
  },
  label: {
    type: 'string',
    label: '标签',
    default: '输入框',
  },
  disabled: {
    type: 'boolean',
    label: '禁用',
    default: false,
  },
  clearable: {
    type: 'boolean',
    label: '可清空',
    default: false,
  },
  password: {
    type: 'boolean',
    label: '密码输入',
    default: false,
  },
  maxlength: {
    type: 'number',
    label: '最大长度',
    default: undefined,
  },
}

export const InputDefinition: ComponentDefinition = {
  name: 'Input',
  label: '输入框',
  category: 'form',
  propsSchema: inputProps,
  defaultProps: {
    placeholder: '请输入',
    label: '输入框',
    disabled: false,
    clearable: false,
    password: false,
  },
  defaultStyles: {
    display: 'block',
    width: '200px',
    'min-height': '32px',
  },
}
