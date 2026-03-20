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
}

export const ImageDefinition: ComponentDefinition = {
  name: 'Image',
  label: '图片',
  category: 'basic',
  propsSchema: imageProps,
  defaultProps: {
    src: '',
    alt: '图片',
    fit: 'cover',
    lazy: false,
    preview: false,
  },
  defaultStyles: {
    display: 'inline-block',
    width: '200px',
    height: '150px',
  },
}
