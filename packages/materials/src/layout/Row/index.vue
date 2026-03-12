<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /** 栅格间距 */
  gutter?: number
  /** 水平对齐 */
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'
  /** 垂直对齐 */
  align?: 'top' | 'middle' | 'bottom' | 'stretch'
  /** 换行 */
  wrap?: boolean
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
  gutter: 0,
  justify: 'start',
  align: 'top',
  wrap: false,
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
  const alignClasses = {
    top: 'items-start',
    middle: 'items-center',
    bottom: 'items-end',
    stretch: 'items-stretch',
  }

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    'space-between': 'justify-between',
    'space-around': 'justify-around',
    'space-evenly': 'justify-evenly',
  }

  const baseClasses = 'flex'
  const align = alignClasses[props.align]
  const justify = justifyClasses[props.justify]
  const wrap = props.wrap ? 'flex-wrap' : 'flex-nowrap'
  const border = props.borderWidth > 0 ? 'border' : ''

  return [baseClasses, align, justify, wrap, border].filter(Boolean).join(' ')
})

const boxStyle = computed(() => ({
  gap: `${props.gutter}px`,
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
    :style="boxStyle"
    @click="handleClick"
  >
    <slot />
  </div>
</template>
