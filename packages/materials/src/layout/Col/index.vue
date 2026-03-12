<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /** 栅格宽度(1-24) */
  span?: number
  /** 左侧偏移 */
  offset?: number
  /** 右移格数 */
  push?: number
  /** 左移格数 */
  pull?: number
  /** 内边距 */
  padding?: string
  /** 背景颜色 */
  backgroundColor?: string
  /** 最小高度 */
  minHeight?: string
  /** 边框 */
  borderWidth?: number
  /** 边框样式 */
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none'
  /** 边框颜色 */
  borderColor?: string
  /** 圆角 */
  borderRadius?: string
}>(), {
  span: 24,
  offset: 0,
  push: 0,
  pull: 0,
  padding: '0',
  backgroundColor: 'transparent',
  minHeight: 'auto',
  borderWidth: 0,
  borderStyle: 'solid',
  borderColor: '#e5e7eb',
  borderRadius: '0px',
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const classes = computed(() => {
  const border = props.borderWidth > 0 ? 'border' : ''
  return border
})

const flexStyle = computed(() => ({
  flex: `0 0 ${(props.span / 24) * 100}%`,
  marginLeft: `${(props.offset / 24) * 100}%`,
  position: 'relative' as const,
  right: `${props.push * 4}px`,
  left: `${-props.pull * 4}px`,
  padding: props.padding,
  backgroundColor: props.backgroundColor,
  minHeight: props.minHeight,
  borderWidth: props.borderWidth > 0 ? `${props.borderWidth}px` : '0',
  borderStyle: props.borderStyle,
  borderColor: props.borderColor,
  borderRadius: props.borderRadius,
}))

function handleClick(event: MouseEvent) {
  emit('click', event)
}
</script>

<template>
  <div
    :class="classes"
    :style="flexStyle"
    @click="handleClick"
  >
    <slot />
  </div>
</template>
