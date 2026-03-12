import type { ComponentDefinition, PropSchema } from '@lowcode/shared'

export const imageProps: Record<string, PropSchema> = {
  src: {
    type: 'string',
    label: '图片地址',
    default: '',
  },
  alt: {
    type: 'string',
    label: '替代文本',
    default: '图片',
  },
  width: {
    type: 'string',
    label: '宽度',
    default: '200px',
  },
  height: {
    type: 'string',
    label: '高度',
    default: '150px',
  },
  fit: {
    type: 'select',
    label: '填充模式',
    default: 'cover',
    options: [
      { label: '覆盖', value: 'cover' },
      { label: '包含', value: 'contain' },
      { label: '拉伸', value: 'fill' },
      { label: '无', value: 'none' },
      { label: '缩小', value: 'scale-down' },
    ],
  },
  radius: {
    type: 'string',
    label: '圆角',
    default: '0px',
  },
  lazy: {
    type: 'boolean',
    label: '懒加载',
    default: false,
  },
  preview: {
    type: 'boolean',
    label: '可预览',
    default: false,
  },
  placeholder: {
    type: 'string',
    label: '加载占位图',
    default: '',
  },
  error: {
    type: 'string',
    label: '错误占位图',
    default: '',
  },
  draggable: {
    type: 'boolean',
    label: '可拖拽',
    default: true,
  },
}

export const ImageDefinition: ComponentDefinition = {
  name: 'Image',
  label: '图片',
  category: 'basic',
  propsSchema: imageProps,
  defaultProps: {
    src: '',
    alt: '图片',
    width: '200px',
    height: '150px',
    fit: 'cover',
    radius: '0px',
    lazy: false,
    preview: false,
    placeholder: '',
    error: '',
    draggable: true,
  },
}
