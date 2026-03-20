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
}

export const TextDefinition: ComponentDefinition = {
  name: 'Text',
  label: '文本',
  category: 'basic',
  propsSchema: textProps,
  defaultProps: {
    content: '文本内容',
    tag: 'p',
  },
  defaultStyles: {
    display: 'inline-block',
    'font-size': '14px',
    color: '#333333',
  },
}
