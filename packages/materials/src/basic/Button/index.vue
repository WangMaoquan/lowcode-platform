<script setup lang="ts">
defineProps<{
  text?: string
  type?: 'primary' | 'default' | 'danger' | 'success'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
}>()
</script>

<template>
  <button
    :disabled="disabled || loading"
    class="inline-flex items-center justify-center rounded transition-colors"
    :class="[
      type === 'primary' ? 'bg-indigo-600 text-white hover:bg-indigo-700' : '',
      type === 'danger' ? 'bg-red-600 text-white hover:bg-red-700' : '',
      type === 'success' ? 'bg-green-600 text-white hover:bg-green-700' : '',
      type === 'default' ? 'bg-gray-200 text-gray-900 hover:bg-gray-300' : '',
      size === 'small' ? 'px-3 py-1 text-sm' : '',
      size === 'medium' ? 'px-4 py-2 text-base' : '',
      size === 'large' ? 'px-6 py-3 text-lg' : '',
      disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
    ]"
  >
    <span v-if="loading" class="mr-2">...</span>
    {{ text }}
  </button>
</template>
