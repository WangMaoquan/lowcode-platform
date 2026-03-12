import type { ComponentDefinition, PropSchema } from '@lowcode/shared'

export const buttonProps: Record<string, PropSchema> = {
  text: {
    type: 'string',
    label: '按钮文字',
    default: '按钮',
  },
  type: {
    type: 'select',
    label: '按钮类型',
    default: 'default',
    options: [
      { label: '主要按钮', value: 'primary' },
      { label: '默认按钮', value: 'default' },
      { label: '虚线按钮', value: 'dashed' },
      { label: '文本按钮', value: 'text' },
      { label: '危险按钮', value: 'danger' },
      { label: '成功按钮', value: 'success' },
    ],
  },
  size: {
    type: 'select',
    label: '按钮尺寸',
    default: 'default',
    options: [
      { label: '小型', value: 'small' },
      { label: '默认', value: 'default' },
      { label: '大型', value: 'large' },
    ],
  },
  shape: {
    type: 'select',
    label: '按钮形状',
    default: 'default',
    options: [
      { label: '默认', value: 'default' },
      { label: '圆形', value: 'circle' },
      { label: '圆角', value: 'round' },
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
  block: {
    type: 'boolean',
    label: '块级按钮',
    default: false,
  },
  icon: {
    type: 'select',
    label: '左侧图标',
    default: '',
    options: [
      { label: '无', value: '' },
      { label: '加号', value: 'plus' },
      { label: '搜索', value: 'search' },
      { label: '编辑', value: 'edit' },
      { label: '删除', value: 'delete' },
      { label: '下载', value: 'download' },
      { label: '上传', value: 'upload' },
      { label: '勾选', value: 'check' },
      { label: '关闭', value: 'close' },
      { label: '设置', value: 'setting' },
      { label: '刷新', value: 'refresh' },
      { label: '左箭头', value: 'arrow-left' },
      { label: '右箭头', value: 'arrow-right' },
      { label: '星星', value: 'star' },
      { label: '眼睛', value: 'eye' },
    ],
  },
  iconRight: {
    type: 'select',
    label: '右侧图标',
    default: '',
    options: [
      { label: '无', value: '' },
      { label: '下箭头', value: 'arrow-down' },
      { label: '右箭头', value: 'arrow-right' },
      { label: '搜索', value: 'search' },
      { label: '加号', value: 'plus' },
    ],
  },
  htmlType: {
    type: 'select',
    label: '原生类型',
    default: 'button',
    options: [
      { label: '按钮', value: 'button' },
      { label: '提交', value: 'submit' },
      { label: '重置', value: 'reset' },
    ],
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
    size: 'default',
    shape: 'default',
    disabled: false,
    loading: false,
    block: false,
    icon: '',
    iconRight: '',
    htmlType: 'button',
  },
}
