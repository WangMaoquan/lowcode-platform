import type { PageSchema, ComponentInstance } from '@lowcode/shared/types'

/**
 * 代码生成器主类
 */
export class CodeGenerator {
  /**
   * 生成 Vue 组件代码
   */
  generateVueComponent(pageSchema: PageSchema): string {
    const componentsCode = this.generateComponents(pageSchema.components)
    
    return `<template>
  <div class="page">
${componentsCode}
  </div>
</template>

<script setup lang="ts">
// 组件逻辑
</script>

<style scoped>
.page {
  width: 100%;
  min-height: 100vh;
}
</style>
`
  }

  /**
   * 生成组件代码
   */
  private generateComponents(components: ComponentInstance[], indent = 2): string {
    const spaces = ' '.repeat(indent)
    return components.map(comp => {
      let code = `${spaces}<${comp.name}`
      
      // 添加属性
      if (comp.props && Object.keys(comp.props).length > 0) {
        const propsStr = Object.entries(comp.props)
          .map(([key, value]) => {
            if (typeof value === 'string') {
              return ` ${key}="${value}"`
            }
            return ` :${key}="${JSON.stringify(value)}"`
          })
          .join('')
        code += propsStr
      }
      
      // 处理子组件
      if (comp.children && comp.children.length > 0) {
        code += '>\n'
        code += this.generateComponents(comp.children, indent + 2)
        code += `\n${spaces}</${comp.name}>`
      } else {
        code += ' />'
      }
      
      return code
    }).join('\n')
  }

  /**
   * 生成 CSS 代码
   */
  generateCSS(styles: Record<string, string>): string {
    return Object.entries(styles)
      .map(([key, value]) => `  ${key}: ${value};`)
      .join('\n')
  }
}

export const codeGenerator = new CodeGenerator()
