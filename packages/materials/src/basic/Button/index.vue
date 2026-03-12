<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /** 按钮类型 */
  type?: 'primary' | 'default' | 'dashed' | 'text' | 'danger' | 'success'
  /** 按钮尺寸 */
  size?: 'small' | 'default' | 'large'
  /** 禁用状态 */
  disabled?: boolean
  /** 加载状态 */
  loading?: boolean
  /** 块级按钮 */
  block?: boolean
  /** 按钮形状：default-默认, circle-圆形, round-圆角 */
  shape?: 'default' | 'circle' | 'round'
  /** 左侧图标 */
  icon?: string
  /** 右侧图标 */
  iconRight?: string
  /** 按钮文字 */
  text?: string
  /** 原生 type 属性 */
  htmlType?: 'button' | 'submit' | 'reset'
}>(), {
  type: 'default',
  size: 'default',
  disabled: false,
  loading: false,
  block: false,
  shape: 'default',
  htmlType: 'button',
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const classes = computed(() => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  // 尺寸样式
  const sizeClasses = {
    small: 'px-3 py-1.5 text-xs',
    default: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-base',
  }

  // 圆形按钮特殊尺寸
  const circleSizeClasses = {
    small: 'w-7 h-7 p-0',
    default: 'w-9 h-9 p-0',
    large: 'w-12 h-12 p-0',
  }

  // 类型样式
  const typeClasses = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 active:bg-indigo-800',
    default: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 active:bg-gray-400',
    dashed: 'bg-white text-gray-700 border border-dashed border-gray-400 hover:bg-gray-50 hover:border-gray-500 focus:ring-gray-500',
    text: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500 active:bg-gray-200',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 active:bg-green-800',
  }

  // 形状样式
  const shapeClasses = {
    default: 'rounded',
    circle: 'rounded-full',
    round: 'rounded-full',
  }

  const size = props.shape === 'circle' ? circleSizeClasses[props.size] : sizeClasses[props.size]
  const type = typeClasses[props.type]
  const shape = shapeClasses[props.shape]
  const block = props.block ? 'w-full' : ''

  return [baseClasses, size, type, shape, block].join(' ')
})

const iconSize = computed(() => {
  const sizes = {
    small: 'w-3.5 h-3.5',
    default: 'w-4 h-4',
    large: 'w-5 h-5',
  }
  return sizes[props.size]
})

function handleClick(event: MouseEvent) {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :type="htmlType"
    :disabled="disabled || loading"
    :class="classes"
    @click="handleClick"
  >
    <!-- 加载图标 -->
    <svg
      v-if="loading"
      :class="[iconSize, 'animate-spin mr-2']"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>

    <!-- 左侧图标 -->
    <svg
      v-else-if="icon"
      :class="[iconSize, 'mr-2']"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path v-if="icon === 'plus'" stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
      <path v-else-if="icon === 'search'" stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 0 011 7 74 0z" />
      <path v-else-if="icon === 'edit'" stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      <path v-else-if="icon === 'delete'" stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      <path v-else-if="icon === 'download'" stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      <path v-else-if="icon === 'upload'" stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      <path v-else-if="icon === 'check'" stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      <path v-else-if="icon === 'close'" stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      <path v-else-if="icon === 'setting'" stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path v-else-if="icon === 'refresh'" stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      <path v-else-if="icon === 'arrow-left'" stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      <path v-else-if="icon === 'arrow-right'" stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      <path v-else-if="icon === 'star'" stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      <path v-else-if="icon === 'eye'" stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>

    <!-- 按钮文字 -->
    <span v-if="text && shape !== 'circle'">{{ text }}</span>
    <span v-else-if="!text && shape !== 'circle'" class="mr-2"><slot /></span>

    <!-- 右侧图标 -->
    <svg
      v-if="iconRight && shape !== 'circle'"
      :class="[iconSize, 'ml-2']"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path v-if="iconRight === 'arrow-down'" stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      <path v-else-if="iconRight === 'arrow-right'" stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      <path v-else-if="iconRight === 'search'" stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      <path v-else-if="iconRight === 'plus'" stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  </button>
</template>
