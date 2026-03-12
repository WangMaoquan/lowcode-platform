<script setup lang="ts">
defineProps<{
  title?: string
  subTitle?: string
  content?: string
  shadow?: string
  width?: string
}>()
</script>

<template>
  <div
    class="overflow-hidden bg-white"
    :class="[
      shadow === 'always' ? 'shadow-md' : '',
      shadow === 'hover' ? 'hover:shadow-md transition-shadow' : '',
    ]"
    :style="{ width }"
  >
    <div v-if="title" class="border-b border-gray-200 px-4 py-3">
      <div class="text-base font-medium">{{ title }}</div>
      <div v-if="subTitle" class="text-sm text-gray-500">{{ subTitle }}</div>
    </div>
    <div class="px-4 py-3">
      {{ content }}
    </div>
  </div>
</template>
