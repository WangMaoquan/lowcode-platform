<script setup lang="ts">
defineProps<{
  icon: string
  title?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    :title="title"
    :disabled="disabled"
    class="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
    @click="emit('click')"
  >
    <span class="text-gray-600">{{ icon }}</span>
  </button>
</template>
