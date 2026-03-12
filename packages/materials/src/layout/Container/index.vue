<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /** 全宽容器 */
  fluid?: boolean
  /** 内边距 */
  padding?: string
  /** 背景颜色 */
  backgroundColor?: string
  /** 最小高度 */
  minHeight?: string
  /** 最大宽度 */
  maxWidth?: string
  /** 外边距 */
  margin?: string
  /** 边框 */
  borderWidth?: number
  /** 边框样式 */
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none'
  /** 边框颜色 */
  borderColor?: string
  /** 圆角 */
  borderRadius?: string
  /** 阴影 */
  boxShadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}>(), {
  fluid: false,
  padding: '20px',
  backgroundColor: '#ffffff',
  minHeight: '100px',
  maxWidth: '1200px',
  margin: '0 auto',
  borderWidth: 0,
  borderStyle: 'solid',
  borderColor: '#e5e7eb',
  borderRadius: '0px',
  boxShadow: 'none',
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const classes = computed(() => {
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  }

  const borderClass = props.borderWidth > 0 ? 'border' : ''
  const shadow = shadowClasses[props.boxShadow]

  return [borderClass, shadow].filter(Boolean).join(' ')
})

const boxStyle = computed(() => ({
  padding: props.padding,
  backgroundColor: props.backgroundColor,
  minHeight: props.minHeight,
  maxWidth: props.fluid ? '100%' : props.maxWidth,
  margin: props.fluid ? '0' : props.margin,
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
