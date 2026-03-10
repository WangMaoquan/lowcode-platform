// 组件实例
export interface ComponentInstance {
  id: string
  name: string           // 组件名称，如 'Button'
  label: string         // 显示标签
  props: Record<string, any>  // 属性配置
  styles: Record<string, any> // 样式配置
  events: Record<string, string> // 事件处理
  children?: ComponentInstance[]  // 子组件
  slot?: string         // 插槽名称
}

// 页面 Schema
export interface PageSchema {
  id: string
  name: string
  components: ComponentInstance[]
  styles: Record<string, string>
}

// 组件分类
export type ComponentCategory = 'basic' | 'layout' | 'form' | 'display' | 'chart'

// 属性 Schema
export interface PropSchema {
  type: 'string' | 'number' | 'boolean' | 'select' | 'array' | 'object'
  label: string
  default?: any
  options?: { label: string; value: any }[]
  if?: Record<string, any>  // 条件显示
}

// 组件定义
export interface ComponentDefinition {
  name: string
  label: string
  category: ComponentCategory
  propsSchema: Record<string, PropSchema>
  defaultProps: Record<string, any>
}
