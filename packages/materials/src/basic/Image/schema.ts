import type { ComponentDefinition, PropSchema } from '@lowcode/shared'

export const imageProps: Record<string, PropSchema> = {
  src: {
    type: 'string',
    label: '图片地址',
    default: 'https://via.placeholder.com/200x150',
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
    ],
  },
  radius: {
    type: 'string',
    label: '圆角',
    default: '0px',
  },
}

export const ImageDefinition: ComponentDefinition = {
  name: 'Image',
  label: '图片',
  category: 'basic',
  propsSchema: imageProps,
  defaultProps: {
    src: 'https://via.placeholder.com/200x150',
    alt: '图片',
    width: '200px',
    height: '150px',
    fit: 'cover',
    radius: '0px',
  },
}
