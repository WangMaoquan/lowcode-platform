import type { ComponentDefinition, PropSchema } from '@lowcode/shared'

export const rowProps: Record<string, PropSchema> = {
  gutter: {
    type: 'number',
    label: '栅格间距',
    default: 0,
  },
  justify: {
    type: 'select',
    label: '水平对齐',
    default: 'start',
    options: [
      { label: '左对齐', value: 'start' },
      { label: '居中', value: 'center' },
      { label: '右对齐', value: 'end' },
      { label: '两端对齐', value: 'space-between' },
      { label: '等间距', value: 'space-around' },
      { label: '均匀分布', value: 'space-evenly' },
    ],
  },
  align: {
    type: 'select',
    label: '垂直对齐',
    default: 'top',
    options: [
      { label: '顶部', value: 'top' },
      { label: '居中', value: 'middle' },
      { label: '底部', value: 'bottom' },
      { label: '拉伸', value: 'stretch' },
    ],
  },
  wrap: {
    type: 'boolean',
    label: '换行',
    default: false,
  },
}

export const RowDefinition: ComponentDefinition = {
  name: 'Row',
  label: '行',
  category: 'layout',
  isContainer: true,
  propsSchema: rowProps,
  defaultProps: {
    gutter: 0,
    justify: 'start',
    align: 'top',
    wrap: false,
  },
  defaultStyles: {
    display: 'flex',
    'flex-direction': 'row',
  },
}
