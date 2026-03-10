<script setup lang="ts">
defineProps<{
  label: string
  options: Array<{ label: string; value: string }>
}>()

defineEmits<{
  select: [value: string]
}>()
</script>

<template>
  <div class="relative inline-block">
    <button
      class="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
    >
      {{ label }}
    </button>
  </div>
</template>
