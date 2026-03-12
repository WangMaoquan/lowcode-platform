import type { ComponentDefinition, PropSchema } from '@lowcode/shared'

export const selectProps: Record<string, PropSchema> = {
  placeholder: {
    type: 'string',
    label: '占位符',
    default: '请选择',
  },
  label: {
    type: 'string',
    label: '标签',
    default: '选择器',
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
  multiple: {
    type: 'boolean',
    label: '多选',
    default: false,
  },
  options: {
    type: 'array',
    label: '选项',
    default: [
      { label: '选项1', value: 'option1' },
      { label: '选项2', value: 'option2' },
      { label: '选项3', value: 'option3' },
    ],
  },
}

export const SelectDefinition: ComponentDefinition = {
  name: 'Select',
  label: '选择器',
  category: 'form',
  propsSchema: selectProps,
  defaultProps: {
    placeholder: '请选择',
    label: '选择器',
    disabled: false,
    clearable: false,
    multiple: false,
    options: [
      { label: '选项1', value: 'option1' },
      { label: '选项2', value: 'option2' },
      { label: '选项3', value: 'option3' },
    ],
  },
}
