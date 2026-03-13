import type { ComponentDefinition, PropSchema } from '@lowcode/shared'

export const tableProps: Record<string, PropSchema> = {
  columns: {
    type: 'array',
    label: '表格列',
    default: [
      { label: '列1', dataIndex: 'col1' },
      { label: '列2', dataIndex: 'col2' },
      { label: '列3', dataIndex: 'col3' },
    ],
  },
  data: {
    type: 'array',
    label: '表格数据',
    default: [
      { col1: '数据1-1', col2: '数据1-2', col3: '数据1-3' },
      { col1: '数据2-1', col2: '数据2-2', col3: '数据2-3' },
      { col1: '数据3-1', col2: '数据3-2', col3: '数据3-3' },
    ],
  },
  stripe: {
    type: 'boolean',
    label: '斑马纹',
    default: false,
  },
  border: {
    type: 'boolean',
    label: '边框',
    default: true,
  },
  hover: {
    type: 'boolean',
    label: '悬停高亮',
    default: true,
  },
}

export const TableDefinition: ComponentDefinition = {
  name: 'Table',
  label: '表格',
  category: 'display',
  propsSchema: tableProps,
  defaultProps: {
    columns: [
      { label: '列1', dataIndex: 'col1' },
      { label: '列2', dataIndex: 'col2' },
      { label: '列3', dataIndex: 'col3' },
    ],
    data: [
      { col1: '数据1-1', col2: '数据1-2', col3: '数据1-3' },
      { col1: '数据2-1', col2: '数据2-2', col3: '数据2-3' },
      { col1: '数据3-1', col2: '数据3-2', col3: '数据3-3' },
    ],
    stripe: false,
    border: true,
    hover: true,
  },
  defaultStyles: {
    display: 'block',
    width: '100%',
    'min-width': '400px',
  },
}
