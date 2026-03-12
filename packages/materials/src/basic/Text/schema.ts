import type { ComponentDefinition, PropSchema } from '@lowcode/shared'

export const textProps: Record<string, PropSchema> = {
  content: {
    type: 'string',
    label: '文本内容',
    default: '文本内容',
  },
  tag: {
    type: 'select',
    label: '标签类型',
    default: 'p',
    options: [
      { label: '段落 p', value: 'p' },
      { label: '标题1 h1', value: 'h1' },
      { label: '标题2 h2', value: 'h2' },
      { label: '标题3 h3', value: 'h3' },
      { label: '标题4 h4', value: 'h4' },
      { label: '标题5 h5', value: 'h5' },
      { label: '标题6 h6', value: 'h6' },
      { label: 'span', value: 'span' },
      { label: 'div', value: 'div' },
    ],
  },
  fontSize: {
    type: 'string',
    label: '字体大小',
    default: '14px',
  },
  color: {
    type: 'string',
    label: '字体颜色',
    default: '#333333',
  },
  fontWeight: {
    type: 'select',
    label: '字体粗细',
    default: 'normal',
    options: [
      { label: '正常', value: 'normal' },
      { label: '粗体', value: 'bold' },
      { label: '更粗', value: 'bolder' },
      { label: '100', value: '100' },
      { label: '200', value: '200' },
      { label: '300', value: '300' },
      { label: '400', value: '400' },
      { label: '500', value: '500' },
      { label: '600', value: '600' },
      { label: '700', value: '700' },
      { label: '800', value: '800' },
      { label: '900', value: '900' },
    ],
  },
  textAlign: {
    type: 'select',
    label: '对齐方式',
    default: 'left',
    options: [
      { label: '左对齐', value: 'left' },
      { label: '居中', value: 'center' },
      { label: '右对齐', value: 'right' },
    ],
  },
}

export const TextDefinition: ComponentDefinition = {
  name: 'Text',
  label: '文本',
  category: 'basic',
  propsSchema: textProps,
  defaultProps: {
    content: '文本内容',
    tag: 'p',
    fontSize: '14px',
    color: '#333333',
    fontWeight: 'normal',
    textAlign: 'left',
  },
}
