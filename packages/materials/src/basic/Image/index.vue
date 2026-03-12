<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = withDefaults(defineProps<{
  /** 图片地址 */
  src?: string
  /** 替代文本 */
  alt?: string
  /** 宽度 */
  width?: string
  /** 高度 */
  height?: string
  /** 填充模式 */
  fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  /** 圆角 */
  radius?: string
  /** 懒加载 */
  lazy?: boolean
  /** 加载中占位图 */
  placeholder?: string
  /** 错误占位图 */
  error?: string
  /** 是否支持拖拽 */
  draggable?: boolean
}>(), {
  src: '',
  alt: '图片',
  width: '200px',
  height: '150px',
  fit: 'cover',
  radius: '0px',
  lazy: false,
  placeholder: '',
  error: '',
  draggable: true,
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
  (e: 'load', event: Event): void
  (e: 'error', event: Event): void
}>()

const isLoading = ref(true)
const isError = ref(false)

// 监听 src 变化时重置状态
watch(() => props.src, () => {
  isLoading.value = true
  isError.value = false
})

const showPlaceholder = computed(() => isLoading.value && props.placeholder)
const showError = computed(() => isError.value && props.error)
const showImage = computed(() => !isError.value && props.src)

// 容器样式
const containerStyle = computed(() => ({
  width: props.width,
  height: props.height,
  'border-radius': props.radius,
}))

// 图片样式 - object-fit 必须应用在 img 元素上
const imgStyle = computed(() => ({
  'object-fit': props.fit,
}))

const handleClick = (e: MouseEvent) => {
  emit('click', e)
}

const handleLoad = (e: Event) => {
  isLoading.value = false
  isError.value = false
  emit('load', e)
}

const handleError = (e: Event) => {
  isLoading.value = false
  isError.value = true
  emit('error', e)
}
</script>

<template>
  <div
    class="image-container"
    :style="containerStyle"
    @click="handleClick"
  >
    <!-- 加载中占位图 -->
    <img
      v-if="showPlaceholder"
      :src="placeholder"
      class="image-placeholder"
      alt="loading"
    >
    <!-- 错误占位图 -->
    <img
      v-else-if="showError"
      :src="error"
      class="image-error"
      alt="error"
    >
    <!-- 实际图片 -->
    <img
      v-else-if="showImage"
      :src="src"
      :alt="alt"
      :draggable="draggable"
      :loading="lazy ? 'lazy' : 'eager'"
      class="image-main"
      :style="imgStyle"
      @load="handleLoad"
      @error="handleError"
    >
    <!-- 默认占位 -->
    <div v-else class="image-empty">
      <span>暂无图片</span>
    </div>
  </div>
</template>

<style scoped>
.image-container {
  display: inline-block;
  overflow: hidden;
  background-color: #f5f5f5;
  position: relative;
}

.image-main,
.image-placeholder,
.image-error {
  width: 100%;
  height: 100%;
  display: block;
}

.image-empty {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 14px;
}

.image-container {
  cursor: pointer;
}
</style>
