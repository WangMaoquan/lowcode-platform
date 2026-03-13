<script setup lang="ts">
import { useEditorStore } from '@/stores/editor'
import type { ComponentInstance } from '@lowcode/shared/types'

const props = defineProps<{
  component: ComponentInstance
}>()

const editorStore = useEditorStore()

// 样式属性配置
const styleFields = [
  { key: 'width', label: '宽度', placeholder: '100px / 50%' },
  { key: 'height', label: '高度', placeholder: '100px / auto' },
  { key: 'minWidth', label: '最小宽度', placeholder: '200px' },
  { key: 'maxWidth', label: '最大宽度', placeholder: '800px' },
  { key: 'minHeight', label: '最小高度', placeholder: '100px' },
  { key: 'maxHeight', label: '最大高度', placeholder: '400px' },
  { key: 'margin', label: '外边距', placeholder: '10px / 10px 20px' },
  { key: 'padding', label: '内边距', placeholder: '10px / 10px 20px' },
  { key: 'backgroundColor', label: '背景颜色', placeholder: '#ffffff' },
  { key: 'backgroundImage', label: '背景图片', placeholder: 'url(...)' },
  { key: 'backgroundSize', label: '背景尺寸', placeholder: 'cover' },
  { key: 'backgroundPosition', label: '背景位置', placeholder: 'center' },
  { key: 'borderRadius', label: '圆角', placeholder: '4px / 50%' },
  { key: 'borderWidth', label: '边框宽度', placeholder: '1px' },
  { key: 'borderColor', label: '边框颜色', placeholder: '#ddd' },
  { key: 'borderStyle', label: '边框样式', placeholder: 'solid' },
  { key: 'boxShadow', label: '阴影', placeholder: '0 2px 8px rgba(0,0,0,0.1)' },
  { key: 'opacity', label: '透明度', placeholder: '0-1: 0.5' },
  { key: 'display', label: '显示', placeholder: 'flex / block' },
  { key: 'flexDirection', label: 'flex方向', placeholder: 'row / column' },
  { key: 'justifyContent', label: '主轴对齐', placeholder: 'center / space-between' },
  { key: 'alignItems', label: '交叉轴对齐', placeholder: 'center / stretch' },
  { key: 'flexWrap', label: 'flex换行', placeholder: 'wrap / nowrap' },
  { key: 'gap', label: '间距', placeholder: '8px' },
  { key: 'position', label: '定位', placeholder: 'relative / absolute' },
  { key: 'top', label: '上', placeholder: '10px' },
  { key: 'right', label: '右', placeholder: '10px' },
  { key: 'bottom', label: '下', placeholder: '10px' },
  { key: 'left', label: '左', placeholder: '10px' },
  { key: 'zIndex', label: '层级', placeholder: '100' },
  { key: 'float', label: '浮动', placeholder: 'left / right' },
  { key: 'clear', label: '清除浮动', placeholder: 'both' },
  { key: 'overflow', label: '溢出', placeholder: 'hidden / auto' },
  { key: 'cursor', label: '光标', placeholder: 'pointer / default' },
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
  <div class="rounded-lg overflow-hidden" style="background-color: var(--color-dark-surface-hover);">
    <!-- 区块标题 -->
    <div class="px-3 py-2.5 flex items-center gap-2" style="border-bottom: 1px solid var(--color-dark-border);">
      <div
        class="w-5 h-5 rounded flex items-center justify-center"
        style="background: linear-gradient(135deg, #ec4899, #8b5cf6);"
      >
        <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      </div>
      <h4 class="text-xs font-semibold" style="color: var(--color-dark-text); font-family: var(--font-display);">样式属性</h4>
    </div>

    <div class="p-3 space-y-2">
      <div v-for="field in styleFields" :key="field.key">
        <label class="block text-xs mb-1" style="color: var(--color-dark-text-secondary);">{{ field.label }}</label>
        <input
          type="text"
          :value="component.styles?.[field.key] || ''"
          :placeholder="field.placeholder"
          @input="updateStyle(field.key, ($event.target as HTMLInputElement).value)"
          class="w-full px-2.5 py-1.5 text-xs rounded-lg border transition-all"
          style="
            background-color: var(--color-dark-surface);
            border-color: var(--color-dark-border);
            color: var(--color-dark-text);
          "
        />
      </div>
    </div>
  </div>
</template>
