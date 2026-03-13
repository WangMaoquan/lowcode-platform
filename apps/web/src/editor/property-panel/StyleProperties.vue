<script setup lang="ts">
import { useEditorStore } from '@/stores/editor'
import type { ComponentInstance } from '@lowcode/shared/types'

const props = defineProps<{
  component: ComponentInstance
}>()

const editorStore = useEditorStore()

// 样式属性配置
const styleFields = [
  { key: 'width', label: '宽度', placeholder: '如: 100px 或 50%' },
  { key: 'height', label: '高度', placeholder: '如: 100px 或 auto' },
  { key: 'minWidth', label: '最小宽度', placeholder: '如: 200px' },
  { key: 'maxWidth', label: '最大宽度', placeholder: '如: 800px' },
  { key: 'minHeight', label: '最小高度', placeholder: '如: 100px' },
  { key: 'maxHeight', label: '最大高度', placeholder: '如: 400px' },
  { key: 'margin', label: '外边距', placeholder: '如: 10px 或 10px 20px' },
  { key: 'padding', label: '内边距', placeholder: '如: 10px 或 10px 20px' },
  { key: 'backgroundColor', label: '背景颜色', placeholder: '如: #ffffff' },
  { key: 'backgroundImage', label: '背景图片', placeholder: '如: url(...)' },
  { key: 'backgroundSize', label: '背景尺寸', placeholder: '如: cover' },
  { key: 'backgroundPosition', label: '背景位置', placeholder: '如: center' },
  { key: 'borderRadius', label: '圆角', placeholder: '如: 4px 或 50%' },
  { key: 'borderWidth', label: '边框宽度', placeholder: '如: 1px' },
  { key: 'borderColor', label: '边框颜色', placeholder: '如: #ddd' },
  { key: 'borderStyle', label: '边框样式', placeholder: 'solid' },
  { key: 'boxShadow', label: '阴影', placeholder: '如: 0 2px 8px rgba(0,0,0,0.1)' },
  { key: 'opacity', label: '透明度', placeholder: '0-1 如: 0.5' },
  { key: 'display', label: '显示', placeholder: '如: flex, block, inline-block' },
  { key: 'flexDirection', label: 'flex方向', placeholder: 'row, column' },
  { key: 'justifyContent', label: '主轴对齐', placeholder: 'center, space-between' },
  { key: 'alignItems', label: '交叉轴对齐', placeholder: 'center, stretch' },
  { key: 'flexWrap', label: 'flex换行', placeholder: 'wrap, nowrap' },
  { key: 'gap', label: '间距', placeholder: '如: 8px' },
  { key: 'position', label: '定位', placeholder: 'relative, absolute, fixed' },
  { key: 'top', label: '上', placeholder: '如: 10px' },
  { key: 'right', label: '右', placeholder: '如: 10px' },
  { key: 'bottom', label: '下', placeholder: '如: 10px' },
  { key: 'left', label: '左', placeholder: '如: 10px' },
  { key: 'zIndex', label: '层级', placeholder: '如: 100' },
  { key: 'float', label: '浮动', placeholder: 'left, right' },
  { key: 'clear', label: '清除浮动', placeholder: 'both, left, right' },
  { key: 'overflow', label: '溢出', placeholder: 'hidden, auto, scroll' },
  { key: 'cursor', label: '光标', placeholder: 'pointer, default' },
  { key: 'transition', label: '过渡', placeholder: 'all 0.3s ease' },
  { key: 'transform', label: '变换', placeholder: 'rotate(45deg)' },
]

// 处理样式变化
function updateStyle(key: string, value: string) {
  const newStyles = { ...props.component.styles }

  if (value === '' || value === undefined) {
    delete newStyles[key]
  } else {
    newStyles[key] = value
  }

  editorStore.updateComponent(props.component.id, {
    styles: newStyles
  })
}
</script>

<template>
  <div>
    <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">样式属性</h4>
    <div class="space-y-3">
      <div v-for="field in styleFields" :key="field.key">
        <label class="block text-xs text-gray-600 mb-1">{{ field.label }}</label>
        <input
          type="text"
          :value="component.styles?.[field.key] || ''"
          :placeholder="field.placeholder"
          @input="updateStyle(field.key, ($event.target as HTMLInputElement).value)"
          class="w-full px-2 py-1 text-sm border border-gray-300 rounded"
        />
      </div>
    </div>
  </div>
</template>
