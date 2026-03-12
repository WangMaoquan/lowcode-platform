<script setup lang="ts">
defineProps<{
  gutter?: number
  justify?: string
  align?: string
}>()
</script>

<template>
  <div
    class="flex"
    :style="{
      gap: `${gutter}px`,
      justifyContent: justify,
      alignItems: align,
    }"
  >
    <slot />
  </div>
</template>
