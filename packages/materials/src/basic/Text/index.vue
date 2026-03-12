<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /** 文本内容 */
  content?: string
  /** 标签类型 */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  /** 字体大小 */
  fontSize?: string
  /** 字体颜色 */
  color?: string
  /** 字体粗细 */
  fontWeight?: string | number
  /** 对齐方式 */
  textAlign?: 'left' | 'center' | 'right' | 'justify'
  /** 行高 */
  lineHeight?: string | number
  /** 字间距 */
  letterSpacing?: string
  /** 文本装饰 */
  textDecoration?: 'none' | 'underline' | 'line-through' | 'overline'
  /** 空白处理 */
  whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line'
  /** 字体系列 */
  fontFamily?: string
  /** 斜体 */
  italic?: boolean
}>(), {
  content: '文本内容',
  tag: 'p',
  fontSize: '14px',
  color: '#333333',
  fontWeight: 'normal',
  textAlign: 'left',
  lineHeight: '1.5',
  letterSpacing: 'normal',
  textDecoration: 'none',
  whiteSpace: 'normal',
  fontFamily: 'inherit',
  italic: false,
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const styleObj = computed(() => ({
  fontSize: props.fontSize,
  color: props.color,
  fontWeight: props.fontWeight,
  textAlign: props.textAlign,
  lineHeight: props.lineHeight,
  letterSpacing: props.letterSpacing,
  textDecoration: props.textDecoration,
  whiteSpace: props.whiteSpace,
  fontFamily: props.fontFamily,
  fontStyle: props.italic ? 'italic' : 'normal',
}))

const handleClick = (e: MouseEvent) => {
  emit('click', e)
}
</script>

<template>
  <component
    :is="tag"
    :style="styleObj"
    class="text-component"
    @click="handleClick"
  >
    {{ content }}
  </component>
</template>

<style scoped>
.text-component {
  display: inline-block;
  cursor: pointer;
  transition: color 0.2s ease;
}
</style>
