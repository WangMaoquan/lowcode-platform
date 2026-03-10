<script setup lang="ts">
defineProps<{
  label: string
  options: Array<{ label: string; value: string }>
}>()

const emit = defineEmits<{
  select: [value: string]
}>()
</script>

<template>
  <div class="relative inline-block">
    <button class="px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50">
      {{ label }}
    </button>
  </div>
</template>
