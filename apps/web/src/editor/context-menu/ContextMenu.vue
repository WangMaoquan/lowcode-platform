<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

export interface MenuItem {
  label: string
  icon?: string
  danger?: boolean
  disabled?: boolean
  action: () => void
}

const props = defineProps<{
  x: number
  y: number
  items: MenuItem[]
}>()

const emit = defineEmits<{
  close: []
}>()

const menuRef = ref<HTMLElement>()

// 点击外部关闭菜单
const handleClickOutside = (e: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(e.target as Node)) {
    emit('close')
  }
}

// 处理菜单项点击
const handleItemClick = (item: MenuItem) => {
  if (item.disabled) return
  item.action()
  emit('close')
}

// 按 ESC 关闭菜单
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)

  // 确保菜单不超出视窗
  if (menuRef.value) {
    const rect = menuRef.value.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    if (rect.right > viewportWidth) {
      menuRef.value.style.left = `${props.x - rect.width}px`
    }
    if (rect.bottom > viewportHeight) {
      menuRef.value.style.top = `${props.y - rect.height}px`
    }
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div
    ref="menuRef"
    class="fixed z-50 min-w-[160px] rounded-md border border-gray-200 bg-white py-1 shadow-lg"
    :style="{ left: `${x}px`, top: `${y}px` }"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      class="flex cursor-pointer items-center px-3 py-1.5 text-sm"
      :class="[
        item.danger ? 'text-red-600 hover:bg-red-50' : 'text-gray-700 hover:bg-gray-100',
        item.disabled ? 'cursor-not-allowed opacity-50' : ''
      ]"
      @click="handleItemClick(item)"
    >
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>
