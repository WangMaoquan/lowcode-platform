<script setup lang="ts">
defineProps<{
  fluid?: boolean
  padding?: string
  backgroundColor?: string
  minHeight?: string
}>()
</script>

<template>
  <div
    :style="{
      padding,
      backgroundColor,
      minHeight,
    }"
    :class="fluid ? 'w-full' : ''"
  >
    <slot />
  </div>
</template>
